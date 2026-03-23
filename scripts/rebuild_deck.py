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


# ═══════════════════════════════════════════════════════════════════════════════
# SLIDE 2 — ABOUT US / GROUP HISTORY (Pattern A)
# ═══════════════════════════════════════════════════════════════════════════════

def build_slide_02(prs, logo, images):
    slide = new_slide(prs)
    add_bg(slide)
    add_pattern_a_image(slide, images.get("photo-1504328345606-18bbc8c9d7d1"))
    add_logo(slide, logo)
    add_slide_tag(slide, "GROUP HISTORY")
    add_headline(slide, "Two Decades of Partnership\nwith India's Oil Majors", top=0.55, size=22)

    cards = [
        ("IOCL SSI Stockist  (Est. 2003)",
         ["SERVO lubricants distributor across 6 districts of Western UP",
          "One of IOCL's longest-standing petroleum product partners"]),
        ("HPCL LPG Bottling  (Since Dec 2018)",
         ["Private bottler at Amroha, UP — 30 TMT/yr cylinder bottling",
          "Distributing for HPCL dealers across Amroha region"]),
        ("HPCL O&M Contract  (Sitarganj Plant)",
         ["5-year O&M contract for HPCL Sitarganj LPG Plant",
          "340 TMT total bottling across contract tenure"]),
    ]
    card_h = 1.35
    card_y0 = 1.85
    for i, (title, lines) in enumerate(cards):
        add_card(slide, CONTENT_X, card_y0 + i * (card_h + 0.12),
                 CONTENT_W, card_h, title, lines,
                 title_size=10, line_size=9)

    add_footer(slide)


# ═══════════════════════════════════════════════════════════════════════════════
# SLIDE 3 — ABOUT THE COMPANY (Pattern A)
# ═══════════════════════════════════════════════════════════════════════════════

def build_slide_03(prs, logo, images):
    slide = new_slide(prs)
    add_bg(slide)
    add_pattern_a_image(slide, images.get("photo-1518709268805-4e9042af9f23"))
    add_logo(slide, logo)
    add_slide_tag(slide, "COMPANY OVERVIEW")
    add_headline(slide, "India's Next-Gen\nGroup II+ RRBO Producer", top=0.55, size=22)

    facts = [
        ("Company", "Santosh Petrochemical Innovations Pvt. Ltd."),
        ("Technology", "REVA Process Technologies, Pune (European)"),
        ("Plant Location", "Western Uttar Pradesh (Ghaziabad)"),
        ("Capacity", "65 TPD feed (designed for 200 TPD expansion)"),
        ("Output", "API Group II+ Re-Refined Base Oil (RRBO/LOBS)"),
        ("By-products", "Fuel oil, Asphalt Extender (Residue)"),
    ]
    row_h = 0.42
    row_y0 = 1.70
    for i, (label, value) in enumerate(facts):
        y = row_y0 + i * row_h
        # Subtle row separator
        if i % 2 == 0:
            add_rect(slide, CONTENT_X, y, CONTENT_W, row_h,
                     fill=RGBColor(0x12, 0x1e, 0x2c))
        add_text(slide, label,
            CONTENT_X + 0.1, y + 0.08, 1.4, row_h - 0.1,
            size=8.5, bold=True, color=C_TEAL)
        add_text(slide, value,
            CONTENT_X + 1.55, y + 0.08, CONTENT_W - 1.65, row_h - 0.1,
            size=8.5, color=C_WHITE)

    # EPR callout
    epr_y = row_y0 + len(facts) * row_h + 0.18
    add_rect(slide, CONTENT_X, epr_y, CONTENT_W, 0.72,
             fill=RGBColor(0x04, 0x2a, 0x1e), border=C_TEAL)
    add_text(slide, "EPR MANDATE TAILWIND",
        CONTENT_X + 0.12, epr_y + 0.06, CONTENT_W - 0.24, 0.22,
        size=8, bold=True, color=C_TEAL)
    add_text(slide,
        "CPCB mandates 5% RRBO blending in FY25, scaling to 50% by FY31. "
        "Santosh Group II+ RRBO is purpose-built to fulfil this mandate.",
        CONTENT_X + 0.12, epr_y + 0.28, CONTENT_W - 0.24, 0.38,
        size=8.5, color=C_MUTED)

    add_footer(slide)


# ═══════════════════════════════════════════════════════════════════════════════
# SLIDE 4 — OUR PROMOTERS (Pattern C — 4-column grid)
# ═══════════════════════════════════════════════════════════════════════════════

PROMOTERS = [
    ("Lalit Bindal", "Founder &\nManaging Director", [
        "35+ years in oil & energy sector",
        "IOCL SSI Stockist since 2003",
        "6-district SERVO network, Western UP",
    ]),
    ("Abhinav Bindal", "Director —\nEngineering & Operations", [
        "Structural Engineer, Nabih Youseef Associates, LA",
        "Expertise in large-scale infrastructure design",
        "Driving digital & commercial strategy",
    ]),
    ("Pooja Bindal", "Director —\nAdministration", [
        "8 years independent business management",
        "Proprietor, Bindal Creation (garments & retail)",
        "Financial oversight & administrative leadership",
    ]),
    ("Robin Kumar", "Director —\nOperations", [
        "Based in Noida, Gautam Budh Nagar",
        "Operations & logistics management",
        "Supply chain for feedstock collection",
    ]),
]

def build_slide_04(prs, logo, images):
    slide = new_slide(prs)
    add_bg(slide)
    add_logo(slide, logo)

    # Full-width header
    add_text(slide, "LEADERSHIP TEAM",
        0.35, 0.22, 10.0, 0.25, size=8, bold=True, color=C_TEAL)
    add_text(slide, "Experienced Leadership with Deep IOCL Roots",
        0.35, 0.50, 12.0, 0.55, size=22, bold=True, color=C_WHITE)

    # 4 columns
    col_w = (W - 0.7) / 4 - 0.1
    col_y0 = 1.22
    col_h = H - col_y0 - 0.35
    cx0 = 0.35

    for i, (name, role, bullets) in enumerate(PROMOTERS):
        cx = cx0 + i * (col_w + 0.1)
        add_rect(slide, cx, col_y0, col_w, col_h, fill=C_CARD, border=C_CARD_BORDER)

        # Circular headshot placeholder
        circle_d = 0.85
        circle_x = cx + (col_w - circle_d) / 2
        circle_y = col_y0 + 0.15
        c = slide.shapes.add_shape(9,
            Inches(circle_x), Inches(circle_y),
            Inches(circle_d), Inches(circle_d))
        c.fill.solid(); c.fill.fore_color.rgb = C_GREY
        c.line.color.rgb = C_TEAL; c.line.width = Pt(1.5)

        # Name
        add_text(slide, name,
            cx + 0.08, col_y0 + 1.1, col_w - 0.16, 0.32,
            size=10.5, bold=True, color=C_WHITE, align=PP_ALIGN.CENTER)
        # Role
        add_text(slide, role,
            cx + 0.08, col_y0 + 1.42, col_w - 0.16, 0.5,
            size=8.5, color=C_TEAL, align=PP_ALIGN.CENTER)
        # Teal divider
        add_rect(slide, cx + 0.25, col_y0 + 1.96, col_w - 0.5, 0.03, fill=C_TEAL)
        # Bullets
        for j, b in enumerate(bullets):
            add_text(slide, f"• {b}",
                cx + 0.1, col_y0 + 2.06 + j * 0.52, col_w - 0.2, 0.5,
                size=8.5, color=C_MUTED)

    add_footer(slide)


# ═══════════════════════════════════════════════════════════════════════════════
# SLIDE 5 — THE OPPORTUNITY (Pattern A)
# ═══════════════════════════════════════════════════════════════════════════════

def build_slide_05(prs, logo, images):
    slide = new_slide(prs)
    add_bg(slide)
    add_pattern_a_image(slide, images.get("photo-1611273426858-450d8e3c9fce"))
    add_logo(slide, logo)
    add_slide_tag(slide, "MARKET OPPORTUNITY")
    add_headline(slide, "India's Used Oil Crisis —\nA ₹28,000 Cr Market", top=0.55, size=21)

    # 2×2 stat grid
    stats = [
        ("1.3 MMT", "Used lubricating oil generated in India annually"),
        ("<15%", "Formally recycled — rest burned or dumped"),
        ("257", "CPCB-registered re-refiners in India"),
        ("~0", "Group II+ RRBO producers in North India"),
    ]
    chip_w = (CONTENT_W - 0.1) / 2
    chip_h = 1.0
    gap = 0.1
    grid_y = 1.72
    for i, (val, lbl) in enumerate(stats):
        col = i % 2; row = i // 2
        x = CONTENT_X + col * (chip_w + gap)
        y = grid_y + row * (chip_h + gap)
        bdr = C_TEAL if i in (0, 3) else C_CARD_BORDER
        add_rect(slide, x, y, chip_w, chip_h, fill=C_CARD, border=bdr)
        add_text(slide, val,
            x + 0.12, y + 0.1, chip_w - 0.24, 0.42,
            size=22, bold=True,
            color=C_TEAL if i in (0, 3) else C_WHITE)
        add_text(slide, lbl,
            x + 0.12, y + 0.52, chip_w - 0.24, 0.42,
            size=8.5, color=C_MUTED)

    # Insight callout
    ins_y = grid_y + 2 * (chip_h + gap) + 0.12
    add_rect(slide, CONTENT_X, ins_y, CONTENT_W, 0.82,
             fill=RGBColor(0x04, 0x2a, 0x1e), border=C_TEAL)
    add_text(slide, "THE SANTOSH ADVANTAGE",
        CONTENT_X + 0.12, ins_y + 0.07, CONTENT_W - 0.24, 0.22,
        size=8, bold=True, color=C_TEAL)
    add_text(slide,
        "Only Group II+ producer in North India. Hydrotreating eliminates sulfur to "
        "<300 ppm — competitors (IFP) stuck at Group I via adsorption. EPR-compliant output.",
        CONTENT_X + 0.12, ins_y + 0.30, CONTENT_W - 0.24, 0.46,
        size=9, color=C_MUTED)

    add_footer(slide)


# ═══════════════════════════════════════════════════════════════════════════════
# SLIDE 6 — MARKET SIZE & GROWTH (Pattern A)
# ═══════════════════════════════════════════════════════════════════════════════

def build_slide_06(prs, logo, images):
    slide = new_slide(prs)
    add_bg(slide)
    add_pattern_a_image(slide, images.get("photo-1486325212027-8081e485255e"))
    add_logo(slide, logo)
    add_slide_tag(slide, "MARKET ANALYSIS")
    add_headline(slide, "High Growth,\nPolicy-Backed Market", top=0.55, size=24)

    # 4 KPI chips (2×2)
    kpis = [
        ("USD 3.38B", "India waste oil market (2025)"),
        ("~7.9% CAGR", "Growth to USD 6.22B by 2033"),
        ("4.2 MMT", "India lubricant market (FY22)"),
        ("5–6 MMT", "Projected lubricant market FY31"),
    ]
    chip_w = (CONTENT_W - 0.1) / 2
    chip_h = 0.85
    for i, (val, lbl) in enumerate(kpis):
        col = i % 2; row = i // 2
        x = CONTENT_X + col * (chip_w + 0.1)
        y = 1.68 + row * (chip_h + 0.1)
        add_kpi_chip(slide, val, lbl, x, y, width=chip_w, height=chip_h)

    # Market drivers
    drivers = [
        ("Regulatory Push", "EPR mandate drives formal collection; informal burning criminalised"),
        ("Rising Vehicle Ownership", "Auto sector growth = more used oil generated annually"),
        ("Import Substitution", "Group II+ RRBO replaces costly virgin base oil imports"),
        ("IOCL-Re MOU (Mar 2026)", "India's first national Group II+ RRBO circular economy framework"),
    ]
    driver_y = 1.68 + 2 * (chip_h + 0.1) + 0.15
    for i, (title, desc) in enumerate(drivers):
        add_bullet_row(slide, "•", title, desc,
                       top=driver_y + i * 0.56,
                       icon_color=C_TEAL if i < 2 else RGBColor(0x00, 0x6e, 0x56))

    add_footer(slide)


# ═══════════════════════════════════════════════════════════════════════════════
# SLIDE 8 — PLANT & INFRASTRUCTURE (Pattern A)
# ═══════════════════════════════════════════════════════════════════════════════

def build_slide_08(prs, logo, images):
    slide = new_slide(prs)
    add_bg(slide)
    add_pattern_a_image(slide, images.get("photo-1518709268805-4e9042af9f23"))
    add_logo(slide, logo)
    add_slide_tag(slide, "INFRASTRUCTURE")
    add_headline(slide, "World-Class Plant —\nSCADA-Controlled, CPCB-Compliant", top=0.55, size=20)

    sections = [
        ("A. Distillation", "Dehydration column, vacuum distillation, WFE (REVA), asphalt collector"),
        ("B. Hydrotreating", "3 reactors with metallic catalysts, heat exchangers, H₂ recycle compressor"),
        ("C. Fractionation", "Fractionation column, pre-heaters, pressure vessels, pumps & coolers"),
        ("D. Tank Farm", "Storage: 1000 KL×2, 500 KL×2, 200 KL×2, 100 KL×2 + vapor recovery"),
        ("E. Utilities", "Thermal oil heater, cooling tower, compressed air, 4 chemical injection systems"),
        ("F. Control System", "SCADA + PLC plant-wide, remote monitoring, VFDs on all pumps"),
    ]
    row_h = 0.62
    row_y0 = 1.62
    for i, (sec, desc) in enumerate(sections):
        y = row_y0 + i * (row_h + 0.06)
        fill = RGBColor(0x12, 0x1e, 0x2c) if i % 2 == 0 else C_CARD
        add_rect(slide, CONTENT_X, y, CONTENT_W, row_h, fill=fill)
        add_rect(slide, CONTENT_X, y, 0.04, row_h, fill=C_TEAL)
        add_text(slide, sec,
            CONTENT_X + 0.14, y + 0.07, 1.65, 0.26,
            size=9, bold=True, color=C_TEAL)
        add_text(slide, desc,
            CONTENT_X + 0.14, y + 0.33, CONTENT_W - 0.24, 0.26,
            size=8.5, color=C_MUTED)

    add_footer(slide)


# ═══════════════════════════════════════════════════════════════════════════════
# SLIDE 9 — LOCATION STRATEGY (Pattern A)
# ═══════════════════════════════════════════════════════════════════════════════

def build_slide_09(prs, logo, images):
    slide = new_slide(prs)
    add_bg(slide)
    add_pattern_a_image(slide, images.get("photo-1567427017947-545c5f8d16ad"))
    add_logo(slide, logo)
    add_slide_tag(slide, "LOCATION STRATEGY")
    add_headline(slide, "Ghaziabad — Heart of India's\nIndustrial Lubricant Belt", top=0.55, size=20)
    add_subheadline(slide,
        "Proximity to NCR, Western UP, and major lubricant blending hubs",
        top=1.42)

    points = [
        ("NCR Proximity",
         "Delhi-Meerut corridor — access to India's largest auto & industrial cluster"),
        ("IOCL Distribution Network",
         "Existing 6-district SERVO network = immediate feedstock & customer reach"),
        ("Western UP Industrial Belt",
         "Ghaziabad, Meerut, Muzaffarnagar, Baghpat — consistent used oil volumes"),
        ("Highway Connectivity",
         "NH-58 & NH-9 — excellent tanker logistics for inbound feedstock & outbound RRBO"),
        ("Used Oil Catchment",
         "30M+ vehicles in NCR alone; 200,000+ KL used oil/yr in catchment area"),
        ("Competitor Gap",
         "IFP (Sahibabad) is only re-refiner nearby — cannot produce Group II+"),
    ]
    pt_y = 1.90
    for title, desc in points:
        add_bullet_row(slide, "•", title, desc, top=pt_y)
        pt_y += 0.55

    add_footer(slide)


# ═══════════════════════════════════════════════════════════════════════════════
# SLIDE 10 — PROJECT TIMELINE (Pattern B — Full-Width)
# ═══════════════════════════════════════════════════════════════════════════════

PHASES = [
    ("Pre-Project", "Year 1", "COMPLETE", [
        "Company incorporation & DPR",
        "Technology partner (REVA) selected",
    ], True),
    ("Construction", "Year 2", "COMPLETE", [
        "Civil works, foundations, buildings",
        "REVA plant equipment ordered & delivered",
    ], True),
    ("Commissioning", "Year 3 — NOW", "IN PROGRESS", [
        "Plant commissioning underway",
        "CPCB registration & QC lab (27 instruments)",
    ], False),
    ("Full Operations", "Year 4", "PLANNED", [
        "65 KL/day full capacity",
        "Revenue target: ₹169 Cr+",
    ], False),
    ("Scale-Up", "Year 5–7", "PLANNED", [
        "Expand to 200 TPD capacity",
        "Pan-India RRBO supply capability",
    ], False),
]

def build_slide_10(prs, logo, images):
    slide = new_slide(prs)
    add_bg(slide)
    add_logo(slide, logo)
    add_text(slide, "PROJECT STATUS",
        0.35, 0.22, 10.0, 0.25, size=8, bold=True, color=C_TEAL)
    add_text(slide, "Commissioning in Progress — Production Imminent",
        0.35, 0.50, 12.0, 0.55, size=22, bold=True, color=C_WHITE)

    phase_w = (W - 0.7) / 5 - 0.08
    phase_h = 4.6
    phase_y = 1.2
    px0 = 0.35

    for i, (name, period, status, bullets, done) in enumerate(PHASES):
        px = px0 + i * (phase_w + 0.08)
        active = (status == "IN PROGRESS")

        # Top status bar color
        bar_color = C_TEAL if done else (RGBColor(0x00, 0x6e, 0x56) if active else C_CARD_BORDER)
        add_rect(slide, px, phase_y, phase_w, 0.07, fill=bar_color)

        # Phase box
        box_fill = RGBColor(0x09, 0x2e, 0x22) if active else C_CARD
        add_rect(slide, px, phase_y + 0.07, phase_w, phase_h - 0.07,
                 fill=box_fill,
                 border=C_TEAL if active else C_CARD_BORDER)

        # Phase name
        add_text(slide, name,
            px + 0.1, phase_y + 0.15, phase_w - 0.2, 0.5,
            size=10, bold=True, color=C_WHITE)
        add_text(slide, period,
            px + 0.1, phase_y + 0.65, phase_w - 0.2, 0.25,
            size=8, color=C_MUTED)

        # Status badge
        badge_color = C_TEAL if done else (RGBColor(0xf3, 0x9c, 0x12) if active else C_CARD)
        badge_text_color = C_BG if done else (C_BG if active else C_MUTED)
        add_rect(slide, px + 0.1, phase_y + 0.95, phase_w - 0.2, 0.3,
                 fill=badge_color, border=None)
        add_text(slide, ("✓ " if done else "⟳ " if active else "") + status,
            px + 0.12, phase_y + 0.97, phase_w - 0.24, 0.26,
            size=7.5, bold=True, color=badge_text_color, align=PP_ALIGN.CENTER)

        # Bullets
        for j, b in enumerate(bullets):
            add_text(slide, f"• {b}",
                px + 0.1, phase_y + 1.38 + j * 0.68, phase_w - 0.2, 0.65,
                size=8.5, color=C_MUTED)

        # Connector arrow
        if i < 4:
            add_text(slide, "▶",
                px + phase_w + 0.01, phase_y + phase_h / 2 - 0.1, 0.07, 0.25,
                size=8, color=C_TEAL, align=PP_ALIGN.CENTER)

    add_footer(slide)


# ═══════════════════════════════════════════════════════════════════════════════
# SLIDE 13 — GROWTH SCALE-UP (Pattern B — Full-Width 3-Phase)
# ═══════════════════════════════════════════════════════════════════════════════

def build_slide_13(prs, logo, images):
    slide = new_slide(prs)
    add_bg(slide)
    add_logo(slide, logo)
    add_text(slide, "SCALE-UP PLAN",
        0.35, 0.22, 10.0, 0.25, size=8, bold=True, color=C_TEAL)
    add_text(slide, "65 TPD Today  →  200 TPD Tomorrow",
        0.35, 0.50, 12.0, 0.55, size=24, bold=True, color=C_WHITE)
    add_text(slide, "Designed for scale from day one — infrastructure ready for 3× expansion",
        0.35, 1.08, 11.0, 0.28, size=10, color=C_MUTED)

    phases = [
        ("PHASE 1", "Current", "COMMISSIONING", [
            ("Feed Capacity", "65 TPD"),
            ("RRBO Output", "~16,000 KL/yr"),
            ("Revenue Target", "₹169 Cr by Year 4"),
        ], True),
        ("PHASE 2", "Year 5–6", "PLANNED", [
            ("Feed Capacity", "130 TPD"),
            ("RRBO Output", "~32,000 KL/yr"),
            ("Revenue Target", "₹320–340 Cr"),
        ], False),
        ("PHASE 3", "Year 7+", "DESIGNED CAPACITY", [
            ("Feed Capacity", "200 TPD"),
            ("RRBO Output", "~50,000 KL/yr"),
            ("Revenue Target", "₹450–500 Cr"),
        ], False),
    ]
    col_w = (W - 0.7) / 3 - 0.12
    col_h = 4.5
    col_y = 1.44
    cx0 = 0.35

    for i, (phase, period, status, rows, active) in enumerate(phases):
        cx = cx0 + i * (col_w + 0.12)
        fill = RGBColor(0x09, 0x2e, 0x22) if active else C_CARD
        border = C_TEAL if active else C_CARD_BORDER
        top_fill = C_TEAL if active else RGBColor(0x00, 0x3d, 0x2e)
        add_rect(slide, cx, col_y, col_w, 0.07, fill=top_fill)
        add_rect(slide, cx, col_y + 0.07, col_w, col_h, fill=fill, border=border)
        add_text(slide, phase,
            cx + 0.15, col_y + 0.16, col_w - 0.3, 0.35,
            size=13, bold=True, color=C_TEAL if active else C_WHITE)
        add_text(slide, period,
            cx + 0.15, col_y + 0.52, col_w - 0.3, 0.25,
            size=9, color=C_MUTED)
        add_text(slide, status,
            cx + 0.15, col_y + 0.82, col_w - 0.3, 0.25,
            size=8, bold=True, color=C_TEAL if active else C_MUTED)
        for j, (lbl, val) in enumerate(rows):
            y = col_y + 1.22 + j * 1.0
            add_text(slide, lbl,
                cx + 0.15, y, col_w - 0.3, 0.26,
                size=8.5, color=C_MUTED)
            add_text(slide, val,
                cx + 0.15, y + 0.28, col_w - 0.3, 0.42,
                size=16, bold=True, color=C_TEAL if active else C_WHITE)
        if i < 2:
            add_text(slide, "→",
                cx + col_w + 0.02, col_y + col_h / 2 - 0.1, 0.1, 0.3,
                size=14, bold=True, color=C_TEAL)

    # EPR callout bar
    epr_y = col_y + col_h + 0.18
    add_rect(slide, 0.35, epr_y, W - 0.7, 0.52,
             fill=RGBColor(0x04, 0x1d, 0x13), border=C_CARD_BORDER)
    add_text(slide,
        "EPR mandate scaling from 5% (FY25) → 50% (FY31) will create demand for 650,000+ KL "
        "of RRBO annually — far exceeding current formal supply. Santosh is positioned to be "
        "North India's primary Group II+ supplier.",
        0.48, epr_y + 0.09, W - 1.0, 0.35,
        size=8.5, color=C_MUTED)

    add_footer(slide)


# ═══════════════════════════════════════════════════════════════════════════════
# SLIDE 16 — PARTNERSHIP PROPOSAL / ASK (Pattern B — Full-Width 3-col)
# ═══════════════════════════════════════════════════════════════════════════════

def build_slide_16(prs, logo, images):
    slide = new_slide(prs)
    add_bg(slide)
    add_logo(slide, logo)
    add_text(slide, "IOCL PARTNERSHIP ASK",
        0.35, 0.22, 12.0, 0.25, size=8, bold=True, color=C_TEAL)
    add_text(slide, "Three Strategic Pillars of Partnership",
        0.35, 0.50, 11.5, 0.55, size=24, bold=True, color=C_WHITE)
    add_text(slide,
        "Together: India's first integrated Group II+ RRBO circular economy in North India",
        0.35, 1.08, 11.5, 0.28, size=10, color=C_MUTED)

    pillars = [
        ("01", "Offtake Agreement\n— RRBO Supply", [
            "Preferred supplier for Group II+ RRBO to IOCL blending plants",
            "3–5 year structured offtake, volume-tiered, aligned to EPR ramp",
            "SN 150, SN 500, Bright Stock grades available",
            "Enables IOCL SERVO to meet CPCB EPR mandates",
        ]),
        ("02", "Feedstock Collection\n— Used Oil Network", [
            "Leverage IOCL SERVO dealer network as used oil collection points",
            "IOCL dealers earn collection incentives; IOCL earns EPR credit",
            "Santosh provides containers, logistics, EPR certificates",
            "Formalised, traceable feedstock pipeline — replaces informal burning",
        ]),
        ("03", "Strategic Investment\n& Technical Support", [
            "IOCL equity or debt participation to accelerate 200 TPD scale-up",
            "Technical validation from IOCL R&D (Faridabad)",
            "Joint branding: IOCL-certified Group II+ RRBO",
            "LOI/MOU to unlock bank financing at preferential rates",
        ]),
    ]
    col_w = (W - 0.7) / 3 - 0.1
    col_h = 5.0
    col_y = 1.44
    cx0 = 0.35

    for i, (num, title, bullets) in enumerate(pillars):
        cx = cx0 + i * (col_w + 0.1)
        add_rect(slide, cx, col_y, col_w, 0.07, fill=C_TEAL)
        add_rect(slide, cx, col_y + 0.07, col_w, col_h, fill=C_CARD, border=C_CARD_BORDER)
        add_text(slide, num,
            cx + 0.15, col_y + 0.16, col_w - 0.3, 0.45,
            size=22, bold=True, color=C_TEAL)
        add_text(slide, title,
            cx + 0.15, col_y + 0.62, col_w - 0.3, 0.75,
            size=11, bold=True, color=C_WHITE)
        add_rect(slide, cx + 0.15, col_y + 1.44, col_w - 0.3, 0.03,
                 fill=C_CARD_BORDER)
        for j, b in enumerate(bullets):
            add_text(slide, f"• {b}",
                cx + 0.15, col_y + 1.55 + j * 0.78, col_w - 0.3, 0.72,
                size=9, color=C_MUTED)

    add_footer(slide)
