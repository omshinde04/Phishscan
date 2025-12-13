from typing import List, Dict, Any, Optional
import os
import hashlib
import socket

try:
    import requests  # For optional VirusTotal integration
except ImportError:
    requests = None

# ---- Static risk heuristics ----

DANGEROUS_EXTENSIONS = {
    ".exe", ".bat", ".cmd", ".vbs", ".js",
    ".jar", ".scr", ".ps1", ".msi",
    ".com", ".hta"
}

MACRO_EXTENSIONS = {
    ".docm", ".xlsm", ".pptm"
}

ARCHIVE_EXTENSIONS = {
    ".zip", ".rar", ".7z", ".iso"
}

VT_API_KEY = os.getenv("VT_API_KEY")  # optional


def _safe_sha256(path: str) -> Optional[str]:
    """Compute SHA256 hash of file contents, if accessible."""
    try:
        h = hashlib.sha256()
        with open(path, "rb") as f:
            for chunk in iter(lambda: f.read(8192), b""):
                h.update(chunk)
        return h.hexdigest()
    except Exception:
        return None


def _scan_with_clamav(path: str) -> Dict[str, Any]:
    """
    Optional ClamAV integration using clamd.
    Requires clamd running (or will just return 'disabled').
    """
    try:
        import clamd  # type: ignore

        cd = clamd.ClamdNetworkSocket(host="127.0.0.1", port=3310)
        res = cd.scan(path)
        # Result format example: {'/path/file': ('FOUND', 'Trojan.Generic')}
        if not res:
            return {"enabled": True, "result": "clean"}

        status, signature = list(res.values())[0]
        if status == "FOUND":
            return {"enabled": True, "result": "infected", "signature": signature}
        return {"enabled": True, "result": "clean"}

    except Exception:
        # clamd not installed or not running
        return {"enabled": False, "result": "unavailable"}


def _scan_with_virustotal(sha256: str) -> Dict[str, Any]:
    """
    Optional VirusTotal lookup by hash.
    Uses VT_API_KEY if set and 'requests' is available.
    """
    if not VT_API_KEY or not requests:
        return {"enabled": False, "result": "unavailable"}

    try:
        url = f"https://www.virustotal.com/api/v3/files/{sha256}"
        headers = {"x-apikey": VT_API_KEY}
        resp = requests.get(url, headers=headers, timeout=8)
        if resp.status_code != 200:
            return {"enabled": True, "result": "error", "status": resp.status_code}

        data = resp.json()
        stats = data.get("data", {}).get("attributes", {}).get("last_analysis_stats", {})
        malicious = stats.get("malicious", 0)
        suspicious = stats.get("suspicious", 0)

        verdict = "clean"
        if malicious > 0:
            verdict = "malicious"
        elif suspicious > 0:
            verdict = "suspicious"

        return {
            "enabled": True,
            "result": verdict,
            "stats": stats,
        }

    except Exception:
        return {"enabled": True, "result": "error"}


def _sandbox_stub(path: str) -> Dict[str, Any]:
    """
    Placeholder for future sandbox execution.
    Real implementation would detonate file in an isolated VM/container.
    """
    return {
        "enabled": False,
        "result": "not_implemented",
    }


def scan_attachments(files: List[Any]) -> Dict[str, Any]:
    """
    Analyze attachments for static risk + optional AV/VT hooks.

    `files` can be:
      - list of filenames: ["invoice.pdf.exe", "report.zip"]
      - or list of dicts: [{"name": "...", "path": "/full/path/to/file"}, ...]

    Returns:
      {
        "status": "None" | "Safe" | "Suspicious" | "Dangerous",
        "risk_score": int,
        "issues": [str],
        "details": [
          {
            "name": str,
            "path": str | None,
            "sha256": str | None,
            "ext": str,
            "heuristics": [str],
            "virustotal": {...},
            "clamav": {...},
            "sandbox": {...}
          },
          ...
        ]
      }
    """
    result: Dict[str, Any] = {
        "status": "None",
        "risk_score": 0,
        "issues": [],
        "details": [],
    }

    if not files:
        return result

    danger_points = 0
    result["status"] = "Safe"

    for entry in files:
        if isinstance(entry, dict):
            name = str(entry.get("name", "unknown"))
            path = entry.get("path")
        else:
            name = str(entry)
            path = None

        name_lower = name.lower()
        _, ext = os.path.splitext(name_lower)
        file_issues: List[str] = []
        file_score = 0

        # ---- Static heuristics ----
        if ext in DANGEROUS_EXTENSIONS:
            msg = f"Dangerous executable file type detected: {name}"
            result["issues"].append(msg)
            file_issues.append(msg)
            file_score += 40

        if ext in MACRO_EXTENSIONS:
            msg = f"Macro-enabled Office document: {name}"
            result["issues"].append(msg)
            file_issues.append(msg)
            file_score += 25

        if ext in ARCHIVE_EXTENSIONS:
            msg = f"Compressed archive attachment: {name}"
            result["issues"].append(msg)
            file_issues.append(msg)
            file_score += 15

        if name_lower.count(".") > 1:
            msg = f"Double file extension detected: {name}"
            result["issues"].append(msg)
            file_issues.append(msg)
            file_score += 20

        # ---- Advanced: hash + VT + ClamAV + sandbox (if path is available) ----
        sha256 = None
        vt_info: Dict[str, Any] = {"enabled": False, "result": "unavailable"}
        clam_info: Dict[str, Any] = {"enabled": False, "result": "unavailable"}
        sandbox_info: Dict[str, Any] = {"enabled": False, "result": "unavailable"}

        if path and os.path.isfile(path):
            sha256 = _safe_sha256(path)

            # VirusTotal lookup
            if sha256:
                vt_info = _scan_with_virustotal(sha256)
                if vt_info.get("result") == "malicious":
                    msg = f"VirusTotal reports malicious file: {name}"
                    result["issues"].append(msg)
                    file_issues.append(msg)
                    file_score += 50
                elif vt_info.get("result") == "suspicious":
                    msg = f"VirusTotal reports suspicious indicators for: {name}"
                    result["issues"].append(msg)
                    file_issues.append(msg)
                    file_score += 25

            # ClamAV scan
            clam_info = _scan_with_clamav(path)
            if clam_info.get("result") == "infected":
                msg = f"ClamAV detected malware signature in: {name}"
                result["issues"].append(msg)
                file_issues.append(msg)
                file_score += 50

            # Sandbox stub (for future real detonation)
            sandbox_info = _sandbox_stub(path)

        danger_points += file_score

        result["details"].append({
            "name": name,
            "path": path,
            "ext": ext,
            "sha256": sha256,
            "heuristics": file_issues,
            "virustotal": vt_info,
            "clamav": clam_info,
            "sandbox": sandbox_info,
        })

    risk_score = max(0, min(100, danger_points))
    result["risk_score"] = risk_score

    if risk_score >= 60:
        result["status"] = "Dangerous"
    elif risk_score >= 30:
        result["status"] = "Suspicious"

    return result
