# scripts/rebuild_deck.py
"""
Rebuilds the IOCL pitch deck from scratch.
Run: /Users/abindal/opt/anaconda3/bin/python3 scripts/rebuild_deck.py
Output: asset/Santosh_IOCL_Pitch_Deck_v2.pptx
"""

import sys
sys.path.insert(0, ".")

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from scripts.deck_helpers import (
    C_BG, C_TEAL, C_TEAL2, C_WHITE, C_MUTED, C_CARD, C_CARD_BORDER,
    C_FOOTER, C_GREY, W, H, IMG_W, CONTENT_X, CONTENT_W, FOOTER_Y, FONT,
    add_bg, add_rect, add_text, add_text_multiline, add_image, add_footer,
    add_logo, add_slide_tag, add_headline, add_subheadline, add_kpi_chip,
    add_bullet_row, add_card, add_pattern_a_image,
    download_image, get_logo_bytes
)


def new_slide(prs):
    """Add a blank slide to the presentation."""
    layout = prs.slide_layouts[6]  # blank
    return prs.slides.add_slide(layout)


# ═══════════════════════════════════════════════════════════════════════════════
# SLIDE 1 — COVER (Pattern A)
# ═══════════════════════════════════════════════════════════════════════════════

def build_slide_01(prs, logo, images):
    slide = new_slide(prs)
    add_bg(slide)
    add_pattern_a_image(slide, images.get("photo-1565008576549-57569a49371d"))

    # Logo + company name (top of right panel)
    add_logo(slide, logo)
    add_text(slide, "SANTOSH PETROCHEMICAL INNOVATIONS PVT. LTD.",
        CONTENT_X, 0.18, CONTENT_W - 0.7, 0.32,
        size=7.5, color=C_MUTED, bold=False)

    # Tag
    add_text(slide, "PARTNERSHIP PROPOSAL  ·  MARCH 2026",
        CONTENT_X, 0.62, CONTENT_W, 0.22,
        size=8, bold=True, color=C_TEAL)

    # Headline
    add_text(slide, "Group II+\nRe-Refined Base Oil",
        CONTENT_X, 0.88, CONTENT_W, 1.5,
        size=30, bold=True, color=C_WHITE)

    # Subheadline
    add_text(slide,
        "Presented to Indian Oil Corporation Limited\n65 TPD Plant  ·  Ghaziabad, UP",
        CONTENT_X, 2.46, CONTENT_W, 0.65,
        size=10.5, color=C_MUTED)

    # 4 KPI chips (2×2 grid)
    chips = [
        ("₹159 Cr", "Total Investment"),
        ("65 TPD", "Plant Capacity"),
        ("35 Yrs", "IOCL Relationship"),
        ("₹169 Cr+", "Revenue by Year 4"),
    ]
    chip_w, chip_h = 3.3, 0.82
    gap = 0.12
    cx = CONTENT_X
    for i, (val, lbl) in enumerate(chips):
        col = i % 2
        row = i // 2
        x = cx + col * (chip_w + gap)
        y = 3.3 + row * (chip_h + gap)
        add_kpi_chip(slide, val, lbl, x, y, width=chip_w, height=chip_h)

    add_footer(slide)


# ═══════════════════════════════════════════════════════════════════════════════
# SLIDE 7 — REFINING PROCESS (Pattern B — Full-Width)
# ═══════════════════════════════════════════════════════════════════════════════

STEPS = [
    ("01", "Collection &\nPre-Screening",
     "Used oil collected. Feed filtered to 150–250 micron at tank farm.", False),
    ("02", "Dehydration",
     "Heated to 120°C. Water, glycol, solvents removed under vacuum.", False),
    ("03", "Vacuum\nDistillation",
     "Heated 280–300°C. Two-step evaporation separates LOBS.", True),
    ("04", "Hydrotreating",
     "H₂ + metallic catalysts at high pressure. Sulfur → <300 ppm.", True),
    ("05", "Fractionation",
     "Cuts separated: SN 150, SN 500, Bright Stock equivalent.", False),
    ("06", "QC & Dispatch",
     "Viscosity, sulfur, VI, flash point tested. Bulk / drum / IBC.", False),
]

def build_slide_07(prs, logo, images):
    slide = new_slide(prs)
    add_bg(slide)
    add_logo(slide, logo)

    # Tag + headline
    add_text(slide, "TECHNOLOGY & PROCESS",
        0.35, 0.22, 10.0, 0.25, size=8, bold=True, color=C_TEAL)
    add_text(slide, "6-Step Distillation & Hydrotreating",
        0.35, 0.50, 9.5, 0.55, size=22, bold=True, color=C_WHITE)
    add_text(slide, "REVA Process Technologies — European Technology, Indian Scale",
        0.35, 1.05, 9.5, 0.28, size=10, color=C_MUTED)

    # 6 step boxes
    box_w = (W - 0.7) / 6 - 0.06
    box_h = 3.5
    box_y = 1.42
    box_x0 = 0.35

    for i, (num, name, desc, highlight) in enumerate(STEPS):
        bx = box_x0 + i * (box_w + 0.06)
        fill = RGBColor(0x09, 0x2e, 0x22) if highlight else C_CARD
        border = C_TEAL if highlight else C_CARD_BORDER
        # Top accent bar
        add_rect(slide, bx, box_y, box_w, 0.06,
                 fill=C_TEAL if highlight else RGBColor(0x00, 0x3d, 0x2e))
        add_rect(slide, bx, box_y + 0.06, box_w, box_h - 0.06,
                 fill=fill, border=border)
        add_text(slide, num,
            bx + 0.1, box_y + 0.15, box_w - 0.2, 0.32,
            size=13, bold=True,
            color=C_TEAL if highlight else RGBColor(0x00, 0x8a, 0x6e))
        add_text(slide, name,
            bx + 0.1, box_y + 0.48, box_w - 0.2, 0.65,
            size=9.5, bold=True, color=C_WHITE)
        add_text(slide, desc,
            bx + 0.1, box_y + 1.18, box_w - 0.2, 1.8,
            size=8.5, color=C_MUTED, wrap=True)

        # Arrow connector (not last)
        if i < 5:
            arrow_x = bx + box_w + 0.005
            add_text(slide, "▶",
                arrow_x, box_y + box_h/2 - 0.12, 0.06, 0.25,
                size=8, color=C_TEAL, align=PP_ALIGN.CENTER)

    # Output strip
    strip_y = box_y + box_h + 0.18
    add_rect(slide, 0.35, strip_y, W - 0.7, 0.55,
             fill=RGBColor(0x04, 0x1d, 0x13), border=C_CARD_BORDER)
    add_text(slide, "OUTPUT →",
        0.48, strip_y + 0.12, 0.9, 0.28,
        size=8, color=C_MUTED, bold=True)
    outputs = [
        "API Group II+ RRBO",
        "VI ≥ 95",
        "Sulfur <300 ppm",
        "Flash Point >200°C",
    ]
    for i, out in enumerate(outputs):
        bg = C_TEAL if i == 0 else C_CARD
        fg = C_BG if i == 0 else C_MUTED
        pill_w = 1.8 if i == 0 else 1.45
        px = 1.42 + i * 1.90
        add_rect(slide, px, strip_y + 0.09, pill_w, 0.35,
                 fill=bg, border=None)
        add_text(slide, out,
            px + 0.06, strip_y + 0.12, pill_w - 0.12, 0.28,
            size=8.5, bold=(i == 0), color=fg, align=PP_ALIGN.CENTER)

    add_footer(slide)


