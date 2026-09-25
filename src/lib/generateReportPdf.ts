import { jsPDF } from 'jspdf';
import type { CalculationResult } from '@/types/calculator';
import { BRAND_RECOMMENDATIONS, EQUIPMENT_UPGRADE_CONTENT } from '@/constants/calculatorData';
import daiqLogoDark from '@/assets/daiq-logo-dark.jpg';

// ── DSI Brand Palette ────────────────────────────────────────────────
const NAVY: [number, number, number] = [13, 31, 60];
const COGNAC: [number, number, number] = [160, 82, 45];
const GOLD: [number, number, number] = [201, 168, 76];
const CHARCOAL: [number, number, number] = [44, 44, 44];
const MID_GRAY: [number, number, number] = [85, 85, 85];
const LIGHT_GRAY: [number, number, number] = [245, 245, 245];
const BORDER_GRAY: [number, number, number] = [222, 226, 230];
const RED: [number, number, number] = [192, 57, 43];
const GREEN: [number, number, number] = [22, 163, 74];
const TEAL: [number, number, number] = [20, 184, 166];
const WHITE: [number, number, number] = [255, 255, 255];

const VERDICT_COLOR: Record<CalculationResult['verdict'], [number, number, number]> = {
  repair_recommended: GREEN,
  repair_acceptable: TEAL,
  plan_replacement: GOLD,
  replace_recommended: RED,
};

const VERDICT_TINT: Record<CalculationResult['verdict'], [number, number, number]> = {
  repair_recommended: [236, 253, 245],
  repair_acceptable: [240, 253, 250],
  plan_replacement: [255, 251, 235],
  replace_recommended: [254, 242, 242],
};

// ── Page geometry ────────────────────────────────────────────────────
const PAGE_W = 612; // US Letter, pt
const PAGE_H = 792;
const MARGIN = 48;
const CONTENT_W = PAGE_W - MARGIN * 2;
const HEADER_H = 74;
const FOOTER_H = 44;

async function imageUrlToDataURL(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function fmtMoney(val: number): string {
  return `$${Math.round(val).toLocaleString()}`;
}

function fmtK(val: number): string {
  return `$${Math.round(val / 1000)}k`;
}

interface ReportContext {
  doc: jsPDF;
  logoDataUrl: string;
  pageNum: number;
  reportDate: string;
  equipmentLabel: string;
  manufacturer: string;
}

function drawHeader(ctx: ReportContext) {
  const { doc, logoDataUrl, equipmentLabel, manufacturer, reportDate } = ctx;
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, PAGE_W, HEADER_H, 'F');

  // Logo (source image is 1440x360, ratio 4:1)
  const logoW = 168;
  const logoH = logoW / 4;
  try {
    doc.addImage(logoDataUrl, 'JPEG', MARGIN, (HEADER_H - logoH) / 2, logoW, logoH);
  } catch {
    // Fall back to text wordmark if the image fails to embed
    doc.setTextColor(...WHITE);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('DentalAssetIQ', MARGIN, HEADER_H / 2 + 5);
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...GOLD);
  const label = 'EQUIPMENT INTELLIGENCE REPORT';
  doc.text(label, PAGE_W - MARGIN, 30, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(200, 208, 220);
  doc.text(reportDate, PAGE_W - MARGIN, 42, { align: 'right' });

  // Sub-header band with equipment identity
  doc.setFillColor(...LIGHT_GRAY);
  doc.rect(0, HEADER_H, PAGE_W, 34, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...NAVY);
  doc.text(`${equipmentLabel} — ${manufacturer}`, MARGIN, HEADER_H + 22);
}

function drawFooter(ctx: ReportContext) {
  const { doc, pageNum } = ctx;
  const y = PAGE_H - FOOTER_H;
  doc.setDrawColor(...NAVY);
  doc.setLineWidth(1.2);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...MID_GRAY);
  doc.text('Dental Strategy Institute  |  DentalAssetIQ', MARGIN, y + 14);
  doc.text('tools.dentalassetiq.com', PAGE_W / 2, y + 14, { align: 'center' });
  doc.text(`Page ${pageNum}`, PAGE_W - MARGIN, y + 14, { align: 'right' });

  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text(
    'Estimates are generated from industry benchmark data and are provided for informational purposes only.',
    PAGE_W / 2,
    y + 25,
    { align: 'center' }
  );
  doc.text(
    'Consult a certified equipment dealer or service technician before making a final repair or replacement decision.',
    PAGE_W / 2,
    y + 34,
    { align: 'center' }
  );
}

function newPage(ctx: ReportContext) {
  ctx.doc.addPage();
  ctx.pageNum += 1;
  drawHeader(ctx);
  drawFooter(ctx);
}

/** Ensures `needed` pt of vertical space remains before the footer; adds a page if not. */
function ensureSpace(ctx: ReportContext, y: number, needed: number): number {
  const bottomLimit = PAGE_H - FOOTER_H - 14;
  if (y + needed > bottomLimit) {
    newPage(ctx);
    return HEADER_H + 34 + 24;
  }
  return y;
}

function sectionTitle(ctx: ReportContext, y: number, title: string): number {
  const { doc } = ctx;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...NAVY);
  doc.text(title.toUpperCase(), MARGIN, y);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1.5);
  doc.line(MARGIN, y + 4, MARGIN + 26, y + 4);
  return y + 20;
}

function drawScoreBar(
  doc: jsPDF,
  x: number,
  y: number,
  w: number,
  label: string,
  value: number,
  color: [number, number, number]
) {
  const pct = Math.max(0, Math.min(100, value));
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...CHARCOAL);
  doc.text(label, x, y);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...NAVY);
  doc.text(`${Math.round(value)}`, x + w, y, { align: 'right' });

  const barY = y + 4;
  const barH = 6;
  doc.setFillColor(...LIGHT_GRAY);
  doc.roundedRect(x, barY, w, barH, 2, 2, 'F');
  doc.setFillColor(...color);
  doc.roundedRect(x, barY, Math.max(4, (w * pct) / 100), barH, 2, 2, 'F');
}

export async function generateReportPdf(
  result: CalculationResult,
  equipmentLabel: string,
  manufacturer: string
): Promise<void> {
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });
  const logoDataUrl = await imageUrlToDataURL(daiqLogoDark);

  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const ctx: ReportContext = { doc, logoDataUrl, pageNum: 1, reportDate, equipmentLabel, manufacturer };
  drawHeader(ctx);
  drawFooter(ctx);

  let y = HEADER_H + 34 + 24;

  // ── Verdict card ──────────────────────────────────────────────────
  const vColor = VERDICT_COLOR[result.verdict];
  const vTint = VERDICT_TINT[result.verdict];
  const cardH = result.partsFlag ? 82 : 68;
  y = ensureSpace(ctx, y, cardH + 12);

  doc.setFillColor(...vTint);
  doc.roundedRect(MARGIN, y, CONTENT_W, cardH, 6, 6, 'F');
  doc.setFillColor(...vColor);
  doc.rect(MARGIN, y, 4, cardH, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12.5);
  doc.setTextColor(...vColor.map((c) => Math.max(0, c - 30)) as [number, number, number]);
  doc.text(result.verdictLabel, MARGIN + 16, y + 20);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...NAVY);
  doc.text(`${result.scores.finalScore}`, PAGE_W - MARGIN - 16, y + 24, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...MID_GRAY);
  doc.text('DECISION SCORE / 100', PAGE_W - MARGIN - 16, y + 34, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...CHARCOAL);
  const subtextLines = doc.splitTextToSize(result.verdictSubtext, CONTENT_W - 140);
  doc.text(subtextLines, MARGIN + 16, y + 38);

  if (result.partsFlag) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...RED);
    doc.text('⚠ PARTS AVAILABILITY RESTRICTED', MARGIN + 16, y + cardH - 10);
  }

  y += cardH + 26;

  // ── Decision score breakdown ────────────────────────────────────
  y = ensureSpace(ctx, y, 90);
  y = sectionTitle(ctx, y, 'Decision Score Analysis');
  const barW = (CONTENT_W - 24) / 2;
  drawScoreBar(doc, MARGIN, y, barW, 'Lifecycle Risk', Math.min(100, result.scores.ageScore), NAVY);
  drawScoreBar(doc, MARGIN + barW + 24, y, barW, 'Repair Burden', Math.min(100, result.scores.adjustedRepairBurden), COGNAC);
  drawScoreBar(doc, MARGIN, y + 28, barW, 'Obsolescence', Math.min(100, result.scores.obsolescenceScore), GOLD);
  drawScoreBar(
    doc,
    MARGIN + barW + 24,
    y + 28,
    barW,
    'Maintenance Risk',
    result.scores.maintenanceModifier < 0 ? 20 : result.scores.maintenanceModifier > 15 ? 80 : 45,
    TEAL
  );
  y += 60;

  // ── Lifecycle position ──────────────────────────────────────────
  y = ensureSpace(ctx, y, 46);
  y = sectionTitle(ctx, y, 'Lifecycle Position');
  const lifePct = Math.min(100, result.agePercentage);
  const lifeColor = lifePct >= 100 ? RED : lifePct >= 75 ? GOLD : GREEN;
  doc.setFillColor(...LIGHT_GRAY);
  doc.roundedRect(MARGIN, y, CONTENT_W, 9, 3, 3, 'F');
  doc.setFillColor(...lifeColor);
  doc.roundedRect(MARGIN, y, Math.max(6, (CONTENT_W * lifePct) / 100), 9, 3, 3, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...MID_GRAY);
  const installedYear = result.ageYears > 0 ? new Date().getFullYear() - result.ageYears : null;
  doc.text(installedYear ? `Installed (${installedYear})` : 'Installed', MARGIN, y + 22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...CHARCOAL);
  doc.text(`${result.ageYears} yrs old  •  ${result.agePercentage}% of lifespan used`, PAGE_W / 2, y + 22, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...MID_GRAY);
  doc.text(`Expected EOL (${result.expectedLifespan} yrs)`, PAGE_W - MARGIN, y + 22, { align: 'right' });
  y += 40;

  // ── Key metrics row ──────────────────────────────────────────────
  y = ensureSpace(ctx, y, 64);
  y = sectionTitle(ctx, y, 'Key Metrics');
  const metrics: { label: string; value: string; sub: string; color: [number, number, number] }[] = [
    {
      label: 'CURRENT REPAIR EST.',
      value: fmtMoney(result.currentRepairCost),
      sub: `${result.scores.repairBurden}% of replacement value`,
      color: result.scores.repairBurden > 35 ? RED : GREEN,
    },
    {
      label: 'DOWNTIME EXPOSURE',
      value: result.totalDowntimeCost > 0 ? fmtMoney(result.totalDowntimeCost) : '—',
      sub: 'Est. production loss (24mo)',
      color: result.totalDowntimeCost > 5000 ? RED : CHARCOAL,
    },
    {
      label: 'EST. REPLACEMENT COST',
      value: fmtMoney(result.replacementCost),
      sub: 'Industry estimate',
      color: CHARCOAL,
    },
  ];
  const colW = (CONTENT_W - 16) / 3;
  metrics.forEach((m, i) => {
    const x = MARGIN + i * (colW + 8);
    doc.setDrawColor(...BORDER_GRAY);
    doc.setLineWidth(0.75);
    doc.roundedRect(x, y, colW, 52, 4, 4, 'S');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(...MID_GRAY);
    doc.text(m.label, x + 8, y + 14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...m.color);
    doc.text(m.value, x + 8, y + 30);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(...MID_GRAY);
    doc.text(m.sub, x + 8, y + 42);
  });
  y += 68;

  // ── 5-Year cost comparison chart ─────────────────────────────────
  const chartH = 190;
  y = ensureSpace(ctx, y, chartH + 30);
  y = sectionTitle(ctx, y, '5-Year Projected Cost Comparison');

  const repair = result.projectedRepairCosts;
  const replace = result.projectedReplaceCosts;
  const rawMax = Math.max(...repair, ...replace, 1000);
  const niceMax = Math.ceil(rawMax / 10000) * 10000;

  const chartX = MARGIN + 34;
  const chartY = y + 6;
  const chartW = CONTENT_W - 34;
  const plotH = chartH - 46;

  // Y gridlines + labels
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  for (let g = 0; g <= 4; g++) {
    const gy = chartY + plotH - (plotH * g) / 4;
    const val = (niceMax * g) / 4;
    doc.setDrawColor(...LIGHT_GRAY);
    doc.setLineWidth(0.5);
    doc.line(chartX, gy, chartX + chartW, gy);
    doc.setTextColor(...MID_GRAY);
    doc.text(fmtK(val), chartX - 6, gy + 2, { align: 'right' });
  }

  const xStep = chartW / 4;
  const toXY = (i: number, val: number): [number, number] => [
    chartX + xStep * i,
    chartY + plotH - (plotH * val) / niceMax,
  ];

  // Crossover detection (mirrors on-screen chart logic)
  let crossoverIdx: number | null = null;
  for (let i = 1; i < 5; i++) {
    if (repair[i - 1] < replace[i - 1] && repair[i] >= replace[i]) {
      crossoverIdx = i;
      break;
    }
  }
  if (crossoverIdx !== null) {
    const [cx] = toXY(crossoverIdx, 0);
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(1);
    doc.setLineDashPattern([3, 2], 0);
    doc.line(cx, chartY, cx, chartY + plotH);
    doc.setLineDashPattern([], 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...GOLD.map((c) => Math.max(0, c - 40)) as [number, number, number]);
    doc.text('CROSSOVER', cx, chartY - 4, { align: 'center' });
  }

  const drawLine = (data: number[], color: [number, number, number], dashed: boolean) => {
    doc.setDrawColor(...color);
    doc.setFillColor(...color);
    doc.setLineWidth(1.6);
    if (dashed) doc.setLineDashPattern([4, 2], 0);
    for (let i = 0; i < data.length - 1; i++) {
      const [x1, y1] = toXY(i, data[i]);
      const [x2, y2] = toXY(i + 1, data[i + 1]);
      doc.line(x1, y1, x2, y2);
    }
    if (dashed) doc.setLineDashPattern([], 0);
    data.forEach((v, i) => {
      const [px, py] = toXY(i, v);
      doc.circle(px, py, 2, 'F');
    });
  };

  drawLine(replace, NAVY, true);
  drawLine(repair, TEAL, false);

  // X axis labels
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...MID_GRAY);
  for (let i = 0; i < 5; i++) {
    const [px] = toXY(i, 0);
    doc.text(`Year ${i + 1}`, px, chartY + plotH + 14, { align: 'center' });
  }

  // Legend
  const legendY = chartY + plotH + 28;
  doc.setDrawColor(...TEAL);
  doc.setLineWidth(1.6);
  doc.line(chartX, legendY, chartX + 16, legendY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...CHARCOAL);
  doc.text('Repair Path', chartX + 20, legendY + 2.5);

  const legend2X = chartX + 90;
  doc.setDrawColor(...NAVY);
  doc.setLineDashPattern([4, 2], 0);
  doc.line(legend2X, legendY, legend2X + 16, legendY);
  doc.setLineDashPattern([], 0);
  doc.text('Replacement Path (Annualized Cost of Ownership)', legend2X + 20, legendY + 2.5);

  y = legendY + 18;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...MID_GRAY);
  const chartCaption = doc.splitTextToSize(
    "Repair path reflects cumulative, escalating repair and downtime costs based on age and failure frequency. Replacement path spreads the replacement cost over the new equipment's expected lifespan, plus minimal ongoing maintenance, so both paths are compared on an annualized cost-of-ownership basis.",
    CONTENT_W
  );
  doc.text(chartCaption, MARGIN, y);
  y += chartCaption.length * 9 + 14;

  // ── Industry benchmark ───────────────────────────────────────────
  const benchLines = doc.splitTextToSize(result.industryBenchmark, CONTENT_W - 60);
  const benchH = 26 + benchLines.length * 11;
  y = ensureSpace(ctx, y, benchH + 12);
  doc.setFillColor(...NAVY);
  doc.roundedRect(MARGIN, y, CONTENT_W, benchH, 6, 6, 'F');
  doc.setFillColor(...GOLD);
  doc.rect(MARGIN, y, 3, benchH, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...GOLD);
  doc.text('INDUSTRY BENCHMARK', MARGIN + 16, y + 16);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(230, 232, 238);
  doc.text(benchLines, MARGIN + 16, y + 30);
  y += benchH + 24;

  // ── Suggested upgrade path (replace / plan verdicts only) ────────
  const isReplace = result.verdict === 'plan_replacement' || result.verdict === 'replace_recommended';
  if (isReplace) {
    const brandData = BRAND_RECOMMENDATIONS[result.replacementCategory];
    const specificContent = EQUIPMENT_UPGRADE_CONTENT[result.equipmentCategory];
    const tagline = specificContent?.tagline ?? brandData.tagline;
    const features = specificContent?.features ?? brandData.features;
    const rationale = specificContent?.rationale ?? brandData.rationale;

    const rationaleLines = doc.splitTextToSize(`"${rationale}"`, CONTENT_W - 32);
    const featureLineHeights = features.map((f) => doc.splitTextToSize(f, CONTENT_W - 60).length);
    const upgradeH =
      58 + rationaleLines.length * 11 + 10 + featureLineHeights.reduce((a, b) => a + b * 11 + 6, 0) + 10;

    y = ensureSpace(ctx, y, Math.min(upgradeH, 300));
    y = sectionTitle(ctx, y, `Suggested Upgrade Path — ${equipmentLabel}`);

    doc.setFillColor(...NAVY);
    doc.roundedRect(MARGIN, y, CONTENT_W, 40, 6, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...WHITE);
    doc.text(brandData.brand, MARGIN + 16, y + 18);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(210, 216, 226);
    doc.text(tagline, MARGIN + 16, y + 31);
    y += 52;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(...MID_GRAY);
    doc.text(rationaleLines, MARGIN, y);
    y += rationaleLines.length * 11 + 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    features.forEach((feature) => {
      const lines = doc.splitTextToSize(feature, CONTENT_W - 20);
      const rowH = lines.length * 11 + 4;
      y = ensureSpace(ctx, y, rowH + 4);
      doc.setFillColor(...COGNAC);
      doc.circle(MARGIN + 3, y - 3, 2.5, 'F');
      doc.setTextColor(...CHARCOAL);
      doc.text(lines, MARGIN + 14, y);
      y += rowH;
    });
    y += 6;
  }

  // ── Closing CTA ────────────────────────────────────────────────
  const ctaH = 56;
  y = ensureSpace(ctx, y, ctaH + 4);
  doc.setFillColor(...LIGHT_GRAY);
  doc.roundedRect(MARGIN, y, CONTENT_W, ctaH, 6, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...NAVY);
  doc.text('Track this decision across your full equipment fleet with DentalAssetIQ.', MARGIN + 16, y + 22);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...MID_GRAY);
  doc.text('Lifecycle performance, maintenance history, and replacement planning — in one platform.', MARGIN + 16, y + 36);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...COGNAC);
  doc.text('dentalassetiq.com', PAGE_W - MARGIN - 16, y + 29, { align: 'right' });

  const fileName = `DentalAssetIQ-Report-${equipmentLabel.replace(/\s+/g, '-')}-${manufacturer.replace(/\s+/g, '-')}.pdf`;
  doc.save(fileName);
}
