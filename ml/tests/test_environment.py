import sys


def test_python_version_is_pinned() -> None:
    assert sys.version_info[:2] == (3, 12)
