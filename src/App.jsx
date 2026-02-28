import { useState } from "react";

const ETFS = [
  // ── TIER 1: PURE DIVIDEND ──────────────────────────────────────────────────
  {
    ticker: "SCHD", name: "Schwab US Dividend Equity ETF", tier: 1,
    yield: 3.5, frequency: "Quarterly", fee: 0.06, upside: "Full", tax: "High",
    taxNote: "Qualified dividends — lowest tax rate of any strategy here",
    underlying: "Dow Jones US Dividend 100 Index",
    mechanism: "Holds 100 high-quality US dividend stocks screened on cash flow/debt ratio, ROE, yield, and 5-yr dividend growth. No options — pure dividend growth. Rebalances twice yearly.",
    pros: ["Cheapest fee on the list (0.06%)", "Fully qualified dividends — tax-friendly", "Full market upside retained", "~8.7% dividend CAGR over 5 years", "Massive $60B+ AUM"],
    cons: ["Lowest current yield of the group", "Quarterly payouts only", "Heavy financials/consumer staples tilt"],
    bestFor: "Long-term wealth builders — yield grows with you over time as dividends increase",
    color: "#3b82f6", badge: "🏗️ Build Wealth", risk: 2, note: null,
  },
  {
    ticker: "SCHY", name: "Schwab International Dividend Equity ETF", tier: 1,
    yield: 3.8, frequency: "Quarterly", fee: 0.08, upside: "Full", tax: "Medium-High",
    taxNote: "Mostly qualified dividends; foreign tax withholding may apply — matters more in taxable accounts vs IRA",
    underlying: "Dow Jones International Dividend 100 Index",
    mechanism: "International twin of SCHD — 100 non-US stocks from developed & emerging markets with 10+ consecutive dividend years, screened for financial strength and low volatility. Covers Europe, Asia, Canada, EM. +37% total return in 2025 as international outperformed US.",
    pros: ["Ultra-low 0.08% fee", "True global diversification away from US", "Same quality screen as SCHD", "International stocks at historically cheap valuations vs US", "Strong 2025 momentum"],
    cons: ["Yield barely beats money market on its own", "Quarterly payouts only", "Currency risk", "2024 was -1.77% — lumpy performance year to year", "Foreign withholding complexity"],
    bestFor: "SCHD holders wanting global coverage — the SCHD+SCHY pairing is the most popular combination",
    color: "#3b82f6", badge: "🌍 Diversifier", risk: 3, note: null,
  },
  {
    ticker: "SPHD", name: "Invesco S&P 500 High Dividend Low Volatility ETF", tier: 1,
    yield: 3.8, frequency: "Monthly", fee: 0.30, upside: "Full", tax: "Medium-High",
    taxNote: "Mix of qualified and ordinary dividends depending on holdings — generally tax-friendly",
    underlying: "S&P 500 Low Volatility High Dividend Index",
    mechanism: "Selects the 50 highest-yielding stocks from the S&P 500 Low Volatility Index. No options. Monthly payouts. Heavy tilt toward utilities, REITs, and consumer staples — sectors that naturally yield more. Rebalances twice yearly.",
    pros: ["Monthly payouts with NO options complexity", "Low volatility focus = smoother ride", "Reasonable 0.30% fee", "S&P 500 stock quality floor", "Strong YTD 2026 performance"],
    cons: ["Heavy sector concentration (utilities, REITs)", "Underperforms S&P 500 in strong bull markets", "Dividend quality screen weaker than SCHD", "Rate-sensitive — suffers when rates rise"],
    bestFor: "Investors wanting monthly income without any covered call complexity — simpler path to regular income",
    color: "#3b82f6", badge: "📅 Monthly, No Options", risk: 3, note: null,
  },
  {
    ticker: "PEY", name: "Invesco High Yield Equity Dividend Achievers ETF", tier: 1,
    yield: 4.5, frequency: "Monthly", fee: 0.54, upside: "Full", tax: "Medium-High",
    taxNote: "Mix of qualified dividends; check holdings for ordinary income components",
    underlying: "NASDAQ US Dividend Achievers 50 Index",
    mechanism: "Holds 50 stocks with 10+ consecutive years of dividend growth, ranked and weighted by yield. Monthly distribution. Notably only ~2.8% tech exposure — a genuine diversifier for portfolios already heavy in Nasdaq stocks.",
    pros: ["Monthly payouts at 4.5%+ without options", "Very low tech exposure — true diversifier", "10+ yr dividend growth requirement = quality screen", "Monthly income", "Beats money market without options risk"],
    cons: ["0.54% fee is high for a passive fund", "Concentrated in just 50 stocks", "Heavy in utilities/financials/energy", "Dividend growth rate slower than SCHD over time"],
    bestFor: "Investors already overweight in tech (via QQQ, JEPQ, etc.) who want monthly income and real sector balance",
    color: "#3b82f6", badge: "💡 Low-Tech Monthly", risk: 3, note: null,
  },

  // ── TIER 2: SELECTIVE COVERED CALL ────────────────────────────────────────
  {
    ticker: "DIVO", name: "Amplify CWP Enhanced Dividend Income ETF", tier: 2,
    yield: 4.9, frequency: "Monthly", fee: 0.55, upside: "Partial", tax: "Medium",
    taxNote: "Mix of qualified dividends + ordinary income from options premiums — better tax profile than JEPI",
    underlying: "Active — 20-25 S&P 500 blue-chip dividend growth stocks",
    mechanism: "Actively managed portfolio of 20-25 high-quality S&P 500 blue-chips (MSFT, AAPL, JPM, V, etc.). Manager Kevin Simpson tactically writes covered calls on only select positions — not 100% of the portfolio — preserving meaningful upside. Calls avoided around earnings and key events.",
    pros: ["Best total return of any covered call ETF historically", "Keeps most upside — calls written tactically", "Monthly payouts", "12% annualized 5-yr total return", "Institutional-quality stock selection"],
    cons: ["Only 25 holdings — concentrated single-stock risk", "0.55% fee is high for the yield delivered", "Lower yield than JEPI, SPYI, etc.", "Active management = manager-dependent risk"],
    bestFor: "The best 'have your cake and eat it too' option — meaningful income without sacrificing long-term growth",
    color: "#10b981", badge: "⚖️ Best Balance", risk: 4, note: null,
  },
  {
    ticker: "IDVO", name: "Amplify CWP International Enhanced Dividend Income ETF", tier: 2,
    yield: 6.0, frequency: "Monthly", fee: 0.66, upside: "Partial", tax: "Medium",
    taxNote: "Mix of international dividends + options premiums. Foreign withholding tax may apply on underlying holdings.",
    underlying: "Active — international dividend growth stocks (ADRs + foreign)",
    mechanism: "International version of DIVO. Holds high-quality foreign dividend payers and tactically writes covered calls on individual positions. Targets 3-4% from dividends plus 2-4% from option premiums. Strong complement to DIVO for global income coverage.",
    pros: ["Higher yield than SCHY with monthly payouts", "True international diversification", "Selective call writing retains upside", "Natural companion to DIVO for global coverage"],
    cons: ["Higher fee (0.66%)", "Foreign tax withholding complexity", "Smaller AUM than US-focused peers", "Currency risk on underlying holdings"],
    bestFor: "Investors who want DIVO's selective approach applied to international stocks — pairs directly with DIVO",
    color: "#10b981", badge: "🌍 International Income", risk: 5, note: null,
  },
  {
    ticker: "KNG", name: "FT Vest S&P 500 Dividend Aristocrats Target Income ETF", tier: 2,
    yield: 8.5, frequency: "Monthly", fee: 0.75, upside: "Partial", tax: "Medium",
    taxNote: "Mix of qualified Aristocrat dividends + ordinary income from options — better quality than pure covered call ETFs",
    underlying: "S&P 500 Dividend Aristocrats — 25+ consecutive years of dividend increases",
    mechanism: "Built entirely on the S&P 500 Dividend Aristocrats (Lowe's, S&P Global, Kimberly-Clark, etc.). Overlays a covered call strategy targeting ~3% above S&P 500 yield — but critically only writes calls on ~18.7% of the portfolio, retaining significant upside. Monthly income.",
    pros: ["Elite quality backbone — only 25+ yr dividend raisers qualify", "8.5% monthly yield with very limited call writing", "Retains far more upside than JEPI/XYLD", "Defensive quality in downturns"],
    cons: ["Highest fee on this list (0.75%)", "Smaller $500M AUM — less liquid than peers", "Capital appreciation has been muted historically", "Only ~7.7% annualized 10-yr total return"],
    bestFor: "Income investors who want the highest-quality stocks (Dividend Aristocrats) plus a meaningful yield boost — quality-first",
    color: "#10b981", badge: "👑 Aristocrats + Income", risk: 4, note: null,
  },

  // ── TIER 3: CORE COVERED CALL (S&P 500) ───────────────────────────────────
  {
    ticker: "JEPI", name: "JPMorgan Equity Premium Income ETF", tier: 3,
    yield: 7.9, frequency: "Monthly", fee: 0.35, upside: "Capped", tax: "Low",
    taxNote: "Mostly ordinary income via ELNs — taxed at your full marginal rate. Best held in IRA or 401k.",
    underlying: "Active — S&P 500 value stocks + Equity Linked Notes (ELNs)",
    mechanism: "Holds low-volatility S&P 500 stocks selected for value and low beta, plus Equity-Linked Notes (ELNs) — OTC instruments with covered call mechanics built in. The largest covered call ETF at $19B+. Yield varies with market volatility — higher in volatile markets, lower in calm ones.",
    pros: ["Most popular covered call ETF — massive liquidity", "Lower volatility than S&P 500", "~8% monthly income", "0.35% fee is competitive for active management", "Actively managed defensive stock selection"],
    cons: ["ELN counterparty risk — over-the-counter contracts", "Ordinary income taxes = significant drag in taxable accounts", "Capped upside in strong bull markets", "Yield compresses in low-volatility periods"],
    bestFor: "Core income holding in a tax-advantaged account — the most established, most liquid monthly income ETF",
    color: "#f59e0b", badge: "💰 Core Income", risk: 5, note: null,
  },
  {
    ticker: "SPYI", name: "NEOS S&P 500 High Income ETF", tier: 3,
    yield: 12.0, frequency: "Monthly", fee: 0.68, upside: "Capped", tax: "Medium-High",
    taxNote: "Section 1256 contracts: 60% long-term / 40% short-term capital gains split — far more tax-efficient than JEPI or XYLD. Also actively harvests tax losses.",
    underlying: "S&P 500 stocks + Section 1256 index options (actively managed)",
    mechanism: "S&P 500 exposure with an actively managed options overlay using Section 1256 index options — these get a favorable 60/40 long-term/short-term capital gains tax treatment vs JEPI's ordinary income. Also actively harvests tax losses. Higher yield than JEPI with better after-tax economics.",
    pros: ["Best tax efficiency of any S&P 500 covered call ETF", "60/40 capital gains split — much better than JEPI after-tax", "Active tax-loss harvesting throughout the year", "~12% monthly yield", "Strong growing AUM"],
    cons: ["Higher 0.68% fee vs JEPI's 0.35%", "Still caps S&P 500 upside significantly", "More complex structure than JEPI", "Newer fund — less multi-cycle track record"],
    bestFor: "Taxable brokerage accounts — SPYI beats JEPI on after-tax returns in most brackets. The smarter pick outside of an IRA.",
    color: "#f59e0b", badge: "🧾 Tax-Smart Income", risk: 6, note: null,
  },
  {
    ticker: "XYLD", name: "Global X S&P 500 Covered Call ETF", tier: 3,
    yield: 10.8, frequency: "Monthly", fee: 0.60, upside: "Very Limited", tax: "Low",
    taxNote: "Ordinary income — significant tax drag. Best used in tax-advantaged accounts. SPYI does similar with better tax treatment.",
    underlying: "CBOE S&P 500 BuyWrite Index (passive)",
    mechanism: "Passive, rules-based strategy: buys all S&P 500 stocks and sells at-the-money (ATM) covered calls on 100% of the portfolio every month. Maximum premium extraction — no discretion, no stock selection. Simple and transparent but fully caps upside.",
    pros: ["High and consistent ~11% yield", "Full S&P 500 diversification (500 stocks)", "Completely transparent rules-based strategy", "Monthly income", "Large $2B+ AUM"],
    cons: ["Virtually zero upside in strong bull markets", "NAV can slowly erode over long periods", "Ordinary income taxes — SPYI is more efficient", "Only ~8% 10-yr annualized return vs 13%+ S&P 500"],
    bestFor: "Maximum income where capital appreciation is not a goal — retirees in draw-down phase; compare to SPYI for after-tax efficiency",
    color: "#f59e0b", badge: "⚠️ Max Yield / Min Growth", risk: 7, note: null,
  },

  // ── TIER 4: AGGRESSIVE (NASDAQ / SMALL CAP) ───────────────────────────────
  {
    ticker: "JEPQ", name: "JPMorgan Nasdaq Equity Premium Income ETF", tier: 4,
    yield: 10.3, frequency: "Monthly", fee: 0.35, upside: "Capped", tax: "Low",
    taxNote: "Ordinary income — same tax inefficiency as JEPI but with more volatile tech exposure. Hold in IRA to offset.",
    underlying: "Active — Nasdaq-100 stocks + Equity Linked Notes (ELNs)",
    mechanism: "Nasdaq-100 version of JEPI. Tech-heavy (Apple, Nvidia, Meta, Alphabet, etc.) with ELN-based options overlay. Higher tech volatility = larger option premiums = higher yield than JEPI. Same ELN counterparty risk. Yield more variable due to tech volatility swings.",
    pros: ["~10% monthly yield", "Tech/AI/growth company exposure", "Same low 0.35% fee as JEPI", "Very liquid — large established fund"],
    cons: ["Ordinary income taxes — significant drag, especially in taxable", "Caps Nasdaq-100 upside substantially", "More volatile than JEPI", "ELN counterparty risk", "Yield compresses in low-volatility periods"],
    bestFor: "Income investors who want tech/Nasdaq exposure paired with high monthly yield — hold in tax-advantaged account",
    color: "#ef4444", badge: "⚡ Tech Income", risk: 7, note: null,
  },
  {
    ticker: "QQQI", name: "NEOS Nasdaq-100 High Income ETF", tier: 4,
    yield: 14.0, frequency: "Monthly", fee: 0.68, upside: "Capped", tax: "Medium-High",
    taxNote: "Section 1256 contracts — 60/40 capital gains split, more efficient than JEPQ. BUT: SEC yield is ~0.02%, meaning most distributions are classified as return of capital.",
    underlying: "Nasdaq-100 stocks + Section 1256 index options (actively managed)",
    mechanism: "Nasdaq-100 version of SPYI — same NEOS tax-efficient Section 1256 structure, applied to QQQ's higher-volatility tech stocks for larger premiums. Critical detail: most distributions are classified as return of capital, which reduces your cost basis rather than representing true investment income earned by the fund.",
    pros: ["Highest yield of any ETF on this list (~14%)", "Section 1256 tax efficiency — better than JEPQ", "Active tax-loss harvesting", "Tech/Nasdaq exposure", "$8.2B AUM — very liquid"],
    cons: ["⚠️ Most distributions are return of capital, not true earned income", "SEC yield is only ~0.02% — the real income is tiny", "Heavy Nasdaq concentration risk", "0.68% fee", "Only since Jan 2024 — very limited history"],
    bestFor: "Investors who fully understand return-of-capital distributions and want maximum monthly cash flow from tech exposure",
    color: "#ef4444", badge: "🔥 Highest Yield",
    risk: 8,
    note: "⚠️ The 14% yield is partially misleading. A large portion of distributions are classified as return of capital — your own invested money coming back to you, not income the fund earned. This reduces your cost basis and is not a free lunch. The SEC yield is ~0.02%.",
  },
  {
    ticker: "QYLD", name: "Global X Nasdaq-100 Covered Call ETF", tier: 4,
    yield: 12.0, frequency: "Monthly", fee: 0.61, upside: "Very Limited", tax: "Low",
    taxNote: "Ordinary income / return of capital mix — one of the least tax-efficient covered call ETFs. QQQI does the same with better tax treatment.",
    underlying: "CBOE Nasdaq-100 BuyWrite V2 Index (passive)",
    mechanism: "The original big covered call ETF — buys all Nasdaq-100 stocks and sells at-the-money covered calls on 100% of the portfolio monthly. Passive rules-based strategy. Completely capped in bull markets. $7B+ AUM makes it very liquid. Recently losing assets to QQQI and JEPQ.",
    pros: ["~12% monthly yield", "Largest covered call ETF by AUM — very liquid", "Simple and transparent rules", "Tech exposure"],
    cons: ["Terrible total return in bull markets — completely capped upside", "NAV erodes over long periods", "Ordinary income taxes — QQQI is more efficient", "Losing assets to QQQI/JEPQ — money rotating out", "No tax optimization"],
    bestFor: "Investors who want Nasdaq covered call income and need maximum liquidity — but compare to QQQI for better tax treatment",
    color: "#ef4444", badge: "📉 Legacy High Yield",
    risk: 8,
    note: "QYLD is being outcompeted by QQQI (same strategy, better tax treatment) and JEPQ (actively managed, same fee). Worth comparing all three before choosing QYLD.",
  },
  {
    ticker: "RYLD", name: "Global X Russell 2000 Covered Call ETF", tier: 4,
    yield: 13.2, frequency: "Monthly", fee: 0.60, upside: "Very Limited", tax: "Low",
    taxNote: "Ordinary income / return of capital — same tax inefficiency as QYLD and XYLD",
    underlying: "CBOE Russell 2000 BuyWrite Index (passive)",
    mechanism: "Small and mid-cap twist on the Global X covered call strategy — buys ~2000 Russell 2000 stocks and sells ATM covered calls on 100% monthly. Higher small-cap volatility generates larger premiums than XYLD. Complements XYLD to cover the full US equity market (large + small cap).",
    pros: ["Highest yield of the Global X trio (~13%)", "Small-cap diversification — different from S&P 500", "Monthly income", "Natural XYLD complement for full US market coverage"],
    cons: ["Small caps = larger drawdowns and higher volatility", "NAV erosion risk in bull markets", "Ordinary income taxes", "Smaller $1.4B AUM vs QYLD/XYLD", "Less liquidity than Tier 3 funds"],
    bestFor: "Income investors pairing with XYLD to get full US market covered call coverage; or those specifically wanting small-cap exposure with high yield",
    color: "#ef4444", badge: "🏚️ Small Cap Yield", risk: 9, note: null,
  },
];

const TIERS = [
  { id: 1, label: "Tier 1 — Pure Dividend Growth", subtitle: "3–4.5% · No options · Full upside · Most tax-efficient", color: "#3b82f6",
    desc: "Income from dividends only. No options, no complexity. Lower current yield but income can grow over time through dividend increases. The most conservative approach." },
  { id: 2, label: "Tier 2 — Selective Covered Call", subtitle: "4.9–8.5% · Partial/tactical options overlay · Retains meaningful upside", color: "#10b981",
    desc: "These ETFs write covered calls on only a portion of the portfolio, or only at certain times. Better total return than full-overlay funds, with a meaningful yield boost over pure dividends. The sweet spot for many investors." },
  { id: 3, label: "Tier 3 — Core Covered Call (S&P 500)", subtitle: "8–12% · Full or heavy S&P 500 options overlay · Capped upside", color: "#f59e0b",
    desc: "Full covered call overlay on S&P 500 stocks. High monthly income with significantly capped upside. SPYI beats JEPI and XYLD on after-tax economics for taxable accounts." },
  { id: 4, label: "Tier 4 — Aggressive (Nasdaq / Small Cap)", subtitle: "10–14% · Tech or small-cap focus · Highest risk & complexity", color: "#ef4444",
    desc: "Maximum yield territory. Nasdaq-100 and Russell 2000 covered call ETFs use higher underlying volatility to generate bigger premiums. Read fine print — several have return-of-capital issues and NAV erosion risk in bull markets." },
];

const QUICK_GUIDE = [
  { q: "I want dividend growth + full upside (US)", pick: "SCHD", why: "Best long-term US wealth builder, lowest fee (0.06%)" },
  { q: "I want global diversification + dividends alongside SCHD", pick: "SCHY", why: "International twin — same quality screen, 0.08% fee" },
  { q: "I want monthly income without any options", pick: "SPHD or PEY", why: "SPHD for low volatility; PEY to avoid tech concentration" },
  { q: "I want best total return + income (balanced)", pick: "DIVO", why: "Selective calls = most upside kept; 12% annualized 5-yr return" },
  { q: "I want international income with a yield boost", pick: "IDVO", why: "International DIVO — pairs perfectly for global income" },
  { q: "I want elite dividend stock quality + high yield", pick: "KNG", why: "Dividend Aristocrats backbone with limited call overlay" },
  { q: "I want ~8-12% monthly from S&P 500 (taxable account)", pick: "SPYI", why: "Most tax-efficient S&P 500 covered call ETF — beats JEPI after-tax" },
  { q: "I want ~8% monthly from S&P 500 (IRA/401k)", pick: "JEPI", why: "Most liquid, most established covered call ETF, lowest fee" },
  { q: "I want Nasdaq exposure + high income (IRA/401k)", pick: "JEPQ", why: "~10% yield with tech tilt; hold in IRA to offset ordinary income" },
  { q: "I want Nasdaq income with best tax treatment", pick: "QQQI", why: "~14% with Section 1256 efficiency — understand return-of-capital first" },
  { q: "I want small-cap coverage to pair with XYLD", pick: "RYLD", why: "Covers full US market with XYLD (large + small cap)" },
];

const COMBOS = [
  { combo: "SCHD + SCHY", desc: "Classic US + international quality dividend pairing. Ultra-low fees, full upside, growing income." },
  { combo: "SCHD + JEPI", desc: "Growth foundation + income engine. Most popular mix for balanced income investors." },
  { combo: "DIVO + IDVO", desc: "Selective covered calls US and internationally. Better total return than full-overlay funds globally." },
  { combo: "SPYI + QQQI", desc: "High income from S&P 500 and Nasdaq with NEOS tax efficiency. Aggressive income for taxable accounts." },
  { combo: "XYLD + RYLD", desc: "Full US market covered call coverage — large cap + small cap. Maximum income extraction." },
  { combo: "KNG + SCHY", desc: "Dividend Aristocrats income + international diversification. Quality-first global income strategy." },
  { combo: "SCHD + DIVO + SCHY", desc: "Triple diversification: US dividend growth, selective calls, international. Comprehensive quality income." },
];

const riskColor = (r) => r <= 3 ? "#3b82f6" : r <= 6 ? "#f59e0b" : "#ef4444";
const taxColor = (t) => (t === "High" || t === "Medium-High") ? "#10b981" : t === "Medium" ? "#f59e0b" : "#ef4444";

export default function ETFDashboard() {
  const [selected, setSelected] = useState(null);
  const [activeTier, setActiveTier] = useState(null);
  const [tab, setTab] = useState("etfs");

  const visibleTiers = activeTier ? TIERS.filter(t => t.id === activeTier) : TIERS;

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#070c16", minHeight: "100vh", color: "#ddd6c8" }}>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(180deg,#0c1625 0%,#070c16 100%)", borderBottom: "1px solid #131e30", padding: "28px 28px 0" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#4a8eff", fontFamily: "monospace", marginBottom: 6 }}>HIGH YIELD ETF GUIDE · FEB 2026 · 14 FUNDS</div>
          <h1 style={{ fontSize: 24, fontWeight: 400, margin: "0 0 4px", color: "#ede5d5" }}>Beat Your Money Market with ETFs</h1>
          <p style={{ margin: "0 0 20px", color: "#5a6a7a", fontSize: 13, fontStyle: "italic" }}>Every income ETF reviewed — ranked by tier, with real yield, tax treatment, tradeoffs and honest analysis.</p>

          {/* Yield spectrum */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {[
              { label: "Money Market", val: "~4.5%", c: "#5a6a7a", bg: "rgba(90,106,122,0.1)" },
              { label: "Tier 1 · Pure Dividend", val: "3–4.5%", c: "#3b82f6", bg: "rgba(59,130,246,0.08)" },
              { label: "Tier 2 · Selective Calls", val: "5–8.5%", c: "#10b981", bg: "rgba(16,185,129,0.08)" },
              { label: "Tier 3 · Core S&P Calls", val: "8–12%", c: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
              { label: "Tier 4 · Aggressive", val: "10–14%", c: "#ef4444", bg: "rgba(239,68,68,0.08)" },
            ].map(c => (
              <div key={c.label} style={{ padding: "8px 14px", background: c.bg, border: `1px solid ${c.c}33`, borderRadius: 7, minWidth: 110 }}>
                <div style={{ fontSize: 9, color: "#4a5568", marginBottom: 2 }}>{c.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: c.c, fontFamily: "monospace" }}>{c.val}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 4 }}>
            {[["etfs", "📊 All 14 ETFs"], ["guide", "🗺️ Quick Guide"]].map(([t, label]) => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "8px 20px", border: "1px solid",
                borderColor: tab === t ? "#4a8eff" : "#131e30",
                background: tab === t ? "rgba(74,142,255,0.1)" : "transparent",
                color: tab === t ? "#4a8eff" : "#5a6a7a",
                borderRadius: "6px 6px 0 0", cursor: "pointer",
                fontSize: 12, letterSpacing: 1, textTransform: "uppercase", fontFamily: "monospace",
              }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 28px" }}>

        {tab === "etfs" && (
          <>
            {/* Tier filter pills */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              <button onClick={() => setActiveTier(null)} style={{
                padding: "5px 14px", border: "1px solid",
                borderColor: !activeTier ? "#ddd6c8" : "#131e30",
                background: !activeTier ? "rgba(221,214,200,0.08)" : "transparent",
                color: !activeTier ? "#ddd6c8" : "#5a6a7a",
                borderRadius: 20, cursor: "pointer", fontSize: 11, fontFamily: "monospace",
              }}>ALL 14</button>
              {TIERS.map(t => (
                <button key={t.id} onClick={() => setActiveTier(activeTier === t.id ? null : t.id)} style={{
                  padding: "5px 14px", border: "1px solid",
                  borderColor: activeTier === t.id ? t.color : "#131e30",
                  background: activeTier === t.id ? `${t.color}15` : "transparent",
                  color: activeTier === t.id ? t.color : "#5a6a7a",
                  borderRadius: 20, cursor: "pointer", fontSize: 11, fontFamily: "monospace",
                }}>TIER {t.id} ({ETFS.filter(e => e.tier === t.id).length})</button>
              ))}
            </div>

            {/* ETF sections by tier */}
            {visibleTiers.map(tier => (
              <div key={tier.id} style={{ marginBottom: 32 }}>
                <div style={{ marginBottom: 12, paddingBottom: 10, borderBottom: `1px solid ${tier.color}33` }}>
                  <div style={{ fontSize: 12, fontFamily: "monospace", color: tier.color, letterSpacing: 1, marginBottom: 3 }}>{tier.label}</div>
                  <div style={{ fontSize: 11, color: "#4a5568", lineHeight: 1.6 }}>{tier.desc}</div>
                </div>
                <div style={{ display: "grid", gap: 7 }}>
                  {ETFS.filter(e => e.tier === tier.id).map(etf => {
                    const isOpen = selected?.ticker === etf.ticker;
                    return (
                      <div key={etf.ticker}>
                        <div
                          onClick={() => setSelected(isOpen ? null : etf)}
                          style={{
                            background: isOpen ? "rgba(74,142,255,0.06)" : "rgba(255,255,255,0.02)",
                            border: "1px solid", borderColor: isOpen ? "#4a8eff" : "#131e30",
                            borderRadius: isOpen ? "9px 9px 0 0" : 9,
                            padding: "13px 18px", cursor: "pointer", transition: "all 0.15s",
                            display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
                          }}
                        >
                          <div style={{ minWidth: 58 }}>
                            <span style={{ fontFamily: "monospace", fontWeight: 800, fontSize: 16, color: tier.color }}>{etf.ticker}</span>
                          </div>
                          <div style={{ flex: 1, minWidth: 160 }}>
                            <div style={{ fontSize: 12, color: "#ccc4b8" }}>{etf.name}</div>
                            <div style={{ fontSize: 10, color: "#3a4555", marginTop: 1, fontFamily: "monospace" }}>{etf.frequency} · {etf.fee}% fee/yr</div>
                          </div>
                          <div style={{ textAlign: "right", minWidth: 64 }}>
                            <div style={{ fontSize: 19, fontWeight: 700, color: "#10b981", fontFamily: "monospace" }}>{etf.yield}%</div>
                            <div style={{ fontSize: 9, color: "#3a4555" }}>yield</div>
                          </div>
                          <div style={{ minWidth: 80, textAlign: "center" }}>
                            <div style={{ fontSize: 10, color: etf.upside === "Full" ? "#10b981" : etf.upside === "Partial" ? "#f59e0b" : "#ef4444", fontFamily: "monospace" }}>{etf.upside}</div>
                            <div style={{ fontSize: 9, color: "#3a4555" }}>upside</div>
                          </div>
                          <div style={{ minWidth: 78, textAlign: "center" }}>
                            <div style={{ fontSize: 10, color: taxColor(etf.tax), fontFamily: "monospace" }}>{etf.tax}</div>
                            <div style={{ fontSize: 9, color: "#3a4555" }}>tax</div>
                          </div>
                          <div style={{ display: "flex", gap: 2 }}>
                            {[1,2,3,4,5,6,7,8,9].map(n => (
                              <div key={n} style={{ width: 7, height: 7, borderRadius: 2, background: n <= etf.risk ? riskColor(etf.risk) : "rgba(255,255,255,0.05)" }} />
                            ))}
                          </div>
                          <div style={{ padding: "3px 9px", borderRadius: 4, border: `1px solid ${tier.color}44`, background: `${tier.color}10`, color: tier.color, fontSize: 10, fontFamily: "monospace", whiteSpace: "nowrap" }}>
                            {etf.badge}
                          </div>
                        </div>

                        {/* Expanded */}
                        {isOpen && (
                          <div style={{ background: "rgba(74,142,255,0.03)", border: "1px solid #4a8eff44", borderTop: "none", borderRadius: "0 0 9px 9px", padding: 18 }}>
                            {etf.note && (
                              <div style={{ marginBottom: 12, padding: "10px 14px", background: "rgba(239,68,68,0.09)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 7 }}>
                                <p style={{ margin: 0, color: "#fca5a5", fontSize: 12, lineHeight: 1.7 }}>{etf.note}</p>
                              </div>
                            )}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(138px,1fr))", gap: 7, marginBottom: 12 }}>
                              {[
                                { l: "Yield", v: `${etf.yield}%`, c: "#10b981" },
                                { l: "Frequency", v: etf.frequency, c: "#ddd6c8" },
                                { l: "Expense Ratio", v: `${etf.fee}%/yr`, c: "#ddd6c8" },
                                { l: "Upside", v: etf.upside, c: etf.upside === "Full" ? "#10b981" : etf.upside === "Partial" ? "#f59e0b" : "#ef4444" },
                                { l: "Tax Efficiency", v: etf.tax, c: taxColor(etf.tax) },
                              ].map(s => (
                                <div key={s.l} style={{ background: "rgba(0,0,0,0.3)", borderRadius: 6, padding: "7px 11px" }}>
                                  <div style={{ fontSize: 9, color: "#3a4555", letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>{s.l}</div>
                                  <div style={{ fontSize: 12, color: s.c, fontFamily: "monospace" }}>{s.v}</div>
                                </div>
                              ))}
                            </div>
                            <div style={{ marginBottom: 12, padding: "10px 14px", background: "rgba(0,0,0,0.3)", borderRadius: 7, borderLeft: `3px solid ${tier.color}` }}>
                              <div style={{ fontSize: 9, color: "#3a4555", letterSpacing: 1, textTransform: "uppercase", marginBottom: 5, fontFamily: "monospace" }}>How It Generates Income</div>
                              <p style={{ margin: 0, color: "#8a9aaa", fontSize: 12, lineHeight: 1.8 }}>{etf.mechanism}</p>
                            </div>
                            <div style={{ marginBottom: 12, padding: "8px 14px", background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 7, fontSize: 11, color: "#c8a865" }}>
                              🧾 Tax: {etf.taxNote}
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                              <div>
                                <div style={{ fontSize: 9, color: "#10b981", letterSpacing: 1, marginBottom: 6, fontFamily: "monospace" }}>✅ PROS</div>
                                {etf.pros.map(p => <div key={p} style={{ fontSize: 11, color: "#7a8a7a", marginBottom: 4, paddingLeft: 8, borderLeft: "2px solid #10b98133", lineHeight: 1.5 }}>{p}</div>)}
                              </div>
                              <div>
                                <div style={{ fontSize: 9, color: "#ef4444", letterSpacing: 1, marginBottom: 6, fontFamily: "monospace" }}>❌ CONS</div>
                                {etf.cons.map(c => <div key={c} style={{ fontSize: 11, color: "#7a8a7a", marginBottom: 4, paddingLeft: 8, borderLeft: "2px solid #ef444433", lineHeight: 1.5 }}>{c}</div>)}
                              </div>
                            </div>
                            <div style={{ padding: "8px 14px", background: "rgba(74,142,255,0.07)", border: "1px solid rgba(74,142,255,0.2)", borderRadius: 7, fontSize: 12, color: "#6a9aee" }}>
                              🎯 Best For: {etf.bestFor}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </>
        )}

        {tab === "guide" && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 400, color: "#ede5d5" }}>Which ETF Is Right for You?</h2>
              <p style={{ margin: 0, color: "#5a6a7a", fontSize: 13 }}>Match your situation — click any ETF in the left tab for full details.</p>
            </div>

            <div style={{ display: "grid", gap: 7, marginBottom: 28 }}>
              {QUICK_GUIDE.map((row, i) => {
                const etf = ETFS.find(e => row.pick.startsWith(e.ticker));
                const tier = etf ? TIERS.find(t => t.id === etf?.tier) : null;
                return (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "11px 16px", background: "rgba(255,255,255,0.02)", border: "1px solid #131e30", borderRadius: 8, flexWrap: "wrap" }}>
                    <span style={{ color: "#7a8a7a", fontSize: 12, flex: 1, minWidth: 200 }}>"{row.q}"</span>
                    <span style={{ fontFamily: "monospace", fontWeight: 800, fontSize: 14, color: tier ? tier.color : "#4a8eff", minWidth: 100, textAlign: "center" }}>{row.pick}</span>
                    <span style={{ color: "#4a5568", fontSize: 11, minWidth: 180, textAlign: "right" }}>{row.why}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 12, padding: 20, marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: "#10b981", fontFamily: "monospace", letterSpacing: 2, marginBottom: 14 }}>💡 POPULAR COMBINATIONS</div>
              <div style={{ display: "grid", gap: 10 }}>
                {COMBOS.map(c => (
                  <div key={c.combo} style={{ display: "flex", gap: 16, padding: "9px 0", borderBottom: "1px solid #0e1520", alignItems: "baseline" }}>
                    <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#10b981", minWidth: 180, fontSize: 12 }}>{c.combo}</span>
                    <span style={{ color: "#5a6a7a", fontSize: 12 }}>{c.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: "12px 16px", background: "rgba(255,255,255,0.02)", border: "1px solid #131e30", borderRadius: 8 }}>
              <p style={{ margin: 0, color: "#3a4555", fontSize: 11, fontStyle: "italic" }}>
                Not financial advice. Covered call ETF yields vary with market volatility and are not guaranteed. Return-of-capital distributions reduce cost basis and have tax implications. Consult a qualified financial advisor for personalized guidance.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
