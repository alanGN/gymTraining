import React, { useMemo, useState } from "react";

const initialPlan = {
  lunes: {
    label: "Lunes · Gym",
    meals: [
      { name: "Desayuno", kcal: 360, protein: 34, carbs: 20, fat: 10, foods: "30g pan + jamón/pavo + 200-250g yogur PRO+ + café" },
      { name: "Comida", kcal: 720, protein: 50, carbs: 65, fat: 20, foods: "Pollo, arroz, verduras" },
      { name: "Merienda", kcal: 220, protein: 24, carbs: 10, fat: 7, foods: "Yogur proteico o queso fresco batido" },
      { name: "Cena", kcal: 640, protein: 48, carbs: 20, fat: 28, foods: "Tortilla + claras + verduras" },
    ],
  },
  martes: {
    label: "Martes · Series",
    meals: [
      { name: "Desayuno", kcal: 430, protein: 34, carbs: 42, fat: 10, foods: "30g pan + jamón/pavo + 200-250g yogur PRO+ + café + plátano" },
      { name: "Comida", kcal: 760, protein: 50, carbs: 70, fat: 22, foods: "Ternera, patata, verduras" },
      { name: "Merienda", kcal: 240, protein: 24, carbs: 16, fat: 6, foods: "Yogur proteico" },
      { name: "Cena", kcal: 620, protein: 48, carbs: 18, fat: 28, foods: "Pollo + ensalada grande" },
    ],
  },
  miercoles: {
    label: "Miércoles · Gym",
    meals: [
      { name: "Desayuno", kcal: 360, protein: 34, carbs: 20, fat: 10, foods: "30g pan + jamón/pavo + 200-250g yogur PRO+ + café" },
      { name: "Comida", kcal: 700, protein: 48, carbs: 60, fat: 20, foods: "Pavo, quinoa, verduras" },
      { name: "Merienda", kcal: 220, protein: 24, carbs: 10, fat: 7, foods: "Yogur proteico o queso fresco batido" },
      { name: "Cena", kcal: 660, protein: 50, carbs: 18, fat: 32, foods: "Hamburguesa casera sin pan + verduras" },
    ],
  },
  jueves: {
    label: "Jueves · Running suave",
    meals: [
      { name: "Desayuno", kcal: 360, protein: 34, carbs: 20, fat: 10, foods: "30g pan + jamón/pavo + 200-250g yogur PRO+ + café" },
      { name: "Comida", kcal: 720, protein: 50, carbs: 64, fat: 18, foods: "Pollo, arroz, verduras" },
      { name: "Merienda", kcal: 200, protein: 22, carbs: 8, fat: 6, foods: "Pavo o yogur proteico" },
      { name: "Cena", kcal: 680, protein: 42, carbs: 20, fat: 36, foods: "Ensalada + huevos cocidos + aguacate" },
    ],
  },
  viernes: {
    label: "Viernes · Gym",
    meals: [
      { name: "Desayuno", kcal: 360, protein: 34, carbs: 20, fat: 10, foods: "30g pan + jamón/pavo + 200-250g yogur PRO+ + café" },
      { name: "Comida", kcal: 730, protein: 52, carbs: 58, fat: 24, foods: "Ternera, boniato, verduras" },
      { name: "Merienda", kcal: 220, protein: 24, carbs: 10, fat: 7, foods: "Yogur proteico" },
      { name: "Cena", kcal: 640, protein: 48, carbs: 18, fat: 30, foods: "Tortilla + queso fresco batido" },
    ],
  },
  sabado: {
    label: "Sábado · Descanso activo",
    meals: [
      { name: "Desayuno", kcal: 340, protein: 38, carbs: 14, fat: 8, foods: "Yogur + caseína + café" },
      { name: "Comida", kcal: 980, protein: 40, carbs: 95, fat: 42, foods: "Cheat meal controlada" },
      { name: "Merienda", kcal: 180, protein: 20, carbs: 8, fat: 5, foods: "Queso fresco batido o yogur" },
      { name: "Cena", kcal: 620, protein: 52, carbs: 16, fat: 26, foods: "Pollo + verduras" },
    ],
  },
  domingo: {
    label: "Domingo · Tirada larga",
    meals: [
      { name: "Desayuno / Pre", kcal: 180, protein: 4, carbs: 34, fat: 1, foods: "Café + plátano" },
      { name: "Comida", kcal: 820, protein: 52, carbs: 64, fat: 28, foods: "Salmón, arroz/patata, verduras" },
      { name: "Merienda", kcal: 250, protein: 26, carbs: 18, fat: 6, foods: "Yogur + espelta opcional post-run" },
      { name: "Cena", kcal: 620, protein: 48, carbs: 14, fat: 28, foods: "Tortilla o pollo + ensalada" },
    ],
  },
};

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function getDayTotals(day) {
  return day.meals.reduce(
    (acc, meal) => ({
      kcal: acc.kcal + Number(meal.kcal || 0),
      protein: acc.protein + Number(meal.protein || 0),
      carbs: acc.carbs + Number(meal.carbs || 0),
      fat: acc.fat + Number(meal.fat || 0),
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div className="stat-card" style={{ borderTop: `4px solid ${accent}` }}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}

function MacroBar({ label, value, max, color }) {
  const percent = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className="macro-row">
      <div className="macro-head">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="macro-track">
        <div className="macro-fill" style={{ width: `${percent}%`, background: color }} />
      </div>
    </div>
  );
}

function WeeklyBar({ label, value, max, color }) {
  const percent = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className="weekly-bar">
      <div className="weekly-bar-head">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="weekly-bar-track">
        <div className="weekly-bar-fill" style={{ width: `${percent}%`, background: color }} />
      </div>
    </div>
  );
}

export default function App() {
  const [weight, setWeight] = useState(86);
  const [proteinRatio, setProteinRatio] = useState(2);
  const [mode, setMode] = useState("Definición agresiva");
  const [selectedDay, setSelectedDay] = useState("lunes");
  const [plan, setPlan] = useState(clone(initialPlan));
  const [breakfastYogurt, setBreakfastYogurt] = useState(250);
  const [nightYogurt, setNightYogurt] = useState(250);
  const [caseinNight, setCaseinNight] = useState(30);
  const [yogurtType, setYogurtType] = useState("PRO+");

  const proteinTarget = Math.round(weight * proteinRatio);
  const yogurtProteinPer100 = yogurtType === "PRO+" ? 9 : 4;
  const breakfastProtein = Math.round((breakfastYogurt * yogurtProteinPer100) / 100) + 17;
  const nightProtein = Math.round((nightYogurt * yogurtProteinPer100) / 100) + Math.round((caseinNight * 80) / 100);

  const weeklyRows = useMemo(() => {
    const kcalAdjustment = mode === "Definición agresiva" ? -120 : mode === "Recomposición" ? 0 : 180;

    return Object.entries(plan).map(([key, day]) => {
      const totals = getDayTotals(day);
      return {
        key,
        label: day.label,
        kcal: totals.kcal + kcalAdjustment,
        protein: totals.protein,
        carbs: totals.carbs,
        fat: totals.fat,
      };
    });
  }, [plan, mode]);

  const weeklyAverage = useMemo(() => {
    const total = weeklyRows.reduce(
      (acc, day) => ({
        kcal: acc.kcal + day.kcal,
        protein: acc.protein + day.protein,
        carbs: acc.carbs + day.carbs,
        fat: acc.fat + day.fat,
      }),
      { kcal: 0, protein: 0, carbs: 0, fat: 0 }
    );

    return {
      kcal: Math.round(total.kcal / weeklyRows.length),
      protein: Math.round(total.protein / weeklyRows.length),
      carbs: Math.round(total.carbs / weeklyRows.length),
      fat: Math.round(total.fat / weeklyRows.length),
    };
  }, [weeklyRows]);

  const selected = plan[selectedDay];
  const selectedTotals = getDayTotals(selected);
  const proteinCoverage = Math.min(100, Math.round((weeklyAverage.protein / proteinTarget) * 100));

  function updateMeal(dayKey, mealIndex, field, value) {
    setPlan((prev) => {
      const next = clone(prev);
      next[dayKey].meals[mealIndex][field] = field === "foods" || field === "name" ? value : Number(value || 0);
      return next;
    });
  }

  function resetPlan() {
    setPlan(clone(initialPlan));
  }

  const maxKcal = Math.max(...weeklyRows.map((d) => d.kcal), 1);
  const maxProtein = Math.max(...weeklyRows.map((d) => d.protein), proteinTarget, 1);

  return (
    <>
      <style>{`
        :root {
          --bg: #f4f7fb;
          --card: rgba(255,255,255,0.88);
          --text: #152033;
          --muted: #61708a;
          --line: #dbe3ee;
          --navy: #163a70;
          --blue: #3b82f6;
          --cyan: #14b8a6;
          --orange: #f59e0b;
          --green: #22c55e;
          --red: #ef4444;
          --shadow: 0 18px 45px rgba(22, 58, 112, 0.10);
          --radius-xl: 28px;
          --radius-lg: 20px;
          --radius-md: 14px;
        }

        * { box-sizing: border-box; }
        html, body, #root {
          margin: 0;
          min-height: 100%;
          width: 100%;
        }        
        body {
          overflow-x: hidden;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          color: var(--text);
          background:
            radial-gradient(circle at top left, rgba(20,184,166,0.12), transparent 24%),
            radial-gradient(circle at top right, rgba(59,130,246,0.10), transparent 28%),
            linear-gradient(180deg, #f8fbff 0%, var(--bg) 100%);
        }

        .app-shell {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          paddin

        .hero,
        .panel,
        .content-card,
        .summary-card,
        .weekly-card {
          background: var(--card);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.7);
          box-shadow: var(--shadow);
        }

        .hero {
          border-radius: var(--radius-xl);
          padding: 22px;
          margin-bottom: 20px;
        }

        .badge-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }

        .badge-primary,
        .badge-secondary,
        .day-pill,
        .day-pill-active {
          border-radius: 999px;
          padding: 10px 16px;
          font-size: 14px;
          font-weight: 700;
          border: none;
        }

        .badge-primary { background: linear-gradient(135deg, var(--navy), var(--blue)); color: white; }
        .badge-secondary { background: #eef4fb; color: var(--text); border: 1px solid var(--line); }

        .hero h1 {
          margin: 0;
          font-size: clamp(2rem, 4vw, 3.6rem);
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .hero p {
          color: var(--muted);
          font-size: clamp(1rem, 2vw, 1.2rem);
          line-height: 1.65;
          max-width: 920px;
          margin: 12px 0 0;
        }

        .stats-grid {
          margin-top: 20px;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .stat-card {
          background: linear-gradient(180deg, rgba(255,255,255,0.92), rgba(246,249,253,0.92));
          border: 1px solid var(--line);
          border-radius: 22px;
          padding: 16px;
        }

        .stat-label { color: var(--muted); font-size: 14px; }
        .stat-value { margin-top: 8px; font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 800; }

        .main-grid {
          display: grid;
          grid-template-columns: 340px minmax(0, 1fr);
          gap: 20px;
        }

        .panel,
        .content-card,
        .summary-card,
        .weekly-card {
          border-radius: var(--radius-xl);
          padding: 20px;
        }

        .panel-title,
        .section-title {
          margin: 0 0 14px;
          font-size: 1.8rem;
          letter-spacing: -0.03em;
        }

        .input-block { margin-bottom: 14px; }
        .label { display: block; margin-bottom: 6px; font-size: 14px; font-weight: 700; color: var(--muted); }

        .input,
        .select,
        .meal-input,
        .meal-text {
          width: 100%;
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 12px 14px;
          font-size: 15px;
          background: white;
          color: var(--text);
          outline: none;
          transition: 0.2s ease;
        }

        .input:focus,
        .select:focus,
        .meal-input:focus,
        .meal-text:focus {
          border-color: var(--blue);
          box-shadow: 0 0 0 4px rgba(59,130,246,0.12);
        }

        .quick-card {
          margin-top: 18px;
          background: linear-gradient(135deg, var(--navy), #244c8a);
          color: white;
          border-radius: 20px;
          padding: 16px;
        }

        .quick-card small { opacity: 0.8; }
        .quick-card strong { color: #c7f9f1; }

        .reset-btn {
          width: 100%;
          margin-top: 16px;
          border: none;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--cyan), var(--blue));
          color: white;
          font-weight: 800;
          padding: 14px;
          cursor: pointer;
          transition: transform 0.15s ease, opacity 0.15s ease;
        }

        .reset-btn:hover { transform: translateY(-1px); opacity: 0.96; }

        .content-stack { display: grid; gap: 20px; }

        .day-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .day-pill,
        .day-pill-active {
          cursor: pointer;
          transition: 0.18s ease;
        }

        .day-pill {
          background: white;
          color: var(--text);
          border: 1px solid var(--line);
        }

        .day-pill:hover { transform: translateY(-1px); border-color: var(--blue); }
        .day-pill-active { background: linear-gradient(135deg, var(--navy), var(--blue)); color: white; }

        .day-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) 320px;
          gap: 20px;
        }

        .meal-card {
          border: 1px solid var(--line);
          background: linear-gradient(180deg, rgba(255,255,255,0.94), rgba(244,248,253,0.88));
          border-radius: 22px;
          padding: 14px;
          margin-bottom: 14px;
        }

        .meal-grid {
          display: grid;
          grid-template-columns: 1.4fr repeat(4, minmax(0, 92px));
          gap: 10px;
          margin-bottom: 10px;
        }

        .summary-card-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .mini-stat {
          background: white;
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: 14px;
        }

        .mini-label { color: var(--muted); font-size: 14px; }
        .mini-value { font-size: 2rem; font-weight: 800; margin-top: 8px; }

        .macro-row,
        .weekly-bar { margin-bottom: 14px; }
        .macro-head,
        .weekly-bar-head {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 6px;
          font-size: 14px;
        }

        .macro-track,
        .weekly-bar-track {
          width: 100%;
          height: 14px;
          border-radius: 999px;
          background: #eaf0f7;
          overflow: hidden;
        }

        .macro-fill,
        .weekly-bar-fill {
          height: 100%;
          border-radius: 999px;
          transition: width 0.28s ease;
        }

        .weekly-grid {
          display: grid;
          gap: 14px;
        }

        .weekly-row {
          display: grid;
          grid-template-columns: 180px 1fr 1fr;
          gap: 14px;
          align-items: center;
        }

        .weekly-label {
          font-weight: 800;
          color: var(--text);
        }

        .helper-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-top: 20px;
        }

        .helper-card {
          border-radius: 22px;
          padding: 18px;
          border: 1px solid var(--line);
          background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(245,249,253,0.9));
        }

        .helper-card h4 { margin: 0 0 8px; font-size: 1.05rem; }
        .helper-card p { margin: 0; color: var(--muted); line-height: 1.55; }

        @media (max-width: 1100px) {
          .main-grid,
          .day-layout {
            grid-template-columns: 1fr;
          }

          .stats-grid,
          .helper-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .weekly-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 760px) {
          .app-shell { padding: 12px; }
          .hero,
          .panel,
          .content-card,
          .summary-card,
          .weekly-card { padding: 16px; border-radius: 22px; }
          .stats-grid,
          .helper-grid,
          .summary-card-grid { grid-template-columns: 1fr; }
          .meal-grid { grid-template-columns: 1fr 1fr; }
          .mini-value { font-size: 1.7rem; }
          .hero p { font-size: 1rem; }
        }

        @media (max-width: 520px) {
          .hero h1 { line-height: 1.05; }
          .meal-grid { grid-template-columns: 1fr; }
          .day-row { display: grid; grid-template-columns: 1fr 1fr; }
          .day-pill,
          .day-pill-active { width: 100%; text-align: center; }
        }
      `}</style>

      <div className="app-shell">
        <section className="hero">
          <div className="badge-row">
            <span className="badge-primary">Definición</span>
            <span className="badge-secondary">3 gym + 3 running</span>
            <span className="badge-secondary">Alta proteína</span>
          </div>

          <h1>Plan semanal interactivo</h1>
          <p>
            Visual, limpio y fácil de tocar desde móvil o escritorio. Está pensado para perder grasa manteniendo músculo,
            con proteína alta, desayuno realista, cena ligera con yogur + caseína cuando toque y una cheat meal controlada.
          </p>

          <div className="stats-grid">
            <StatCard label="Kcal medias" value={weeklyAverage.kcal} accent="#3b82f6" />
            <StatCard label="Proteína objetivo" value={`${proteinTarget}g`} accent="#14b8a6" />
            <StatCard label="Proteína media" value={`${weeklyAverage.protein}g`} accent="#22c55e" />
            <StatCard label="Cobertura" value={`${proteinCoverage}%`} accent="#f59e0b" />
          </div>
        </section>

        <div className="main-grid">
          <aside className="panel">
            <h2 className="panel-title">Panel de control</h2>

            <div className="input-block">
              <label className="label">Peso (kg)</label>
              <input className="input" type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value || 0))} />
            </div>

            <div className="input-block">
              <label className="label">Proteína por kg</label>
              <input className="input" type="number" step="0.1" min="1.6" max="2.5" value={proteinRatio} onChange={(e) => setProteinRatio(Number(e.target.value || 0))} />
            </div>

            <div className="input-block">
              <label className="label">Modo</label>
              <select className="select" value={mode} onChange={(e) => setMode(e.target.value)}>
                <option>Definición agresiva</option>
                <option>Recomposición</option>
                <option>Mantenimiento</option>
              </select>
            </div>

            <div className="input-block">
              <label className="label">Tipo de yogur</label>
              <select className="select" value={yogurtType} onChange={(e) => setYogurtType(e.target.value)}>
                <option>PRO+</option>
                <option>Pastoret 0%</option>
              </select>
            </div>

            <div className="input-block">
              <label className="label">Yogur desayuno (g)</label>
              <input className="input" type="number" value={breakfastYogurt} onChange={(e) => setBreakfastYogurt(Number(e.target.value || 0))} />
            </div>

            <div className="input-block">
              <label className="label">Yogur noche (g)</label>
              <input className="input" type="number" value={nightYogurt} onChange={(e) => setNightYogurt(Number(e.target.value || 0))} />
            </div>

            <div className="input-block">
              <label className="label">Caseína noche (g)</label>
              <input className="input" type="number" value={caseinNight} onChange={(e) => setCaseinNight(Number(e.target.value || 0))} />
            </div>

            <div className="quick-card">
              <small>Cálculos rápidos</small>
              <div style={{ marginTop: 10 }}>Desayuno estimado: <strong>{breakfastProtein}g proteína</strong></div>
              <div style={{ marginTop: 8 }}>Cena yogur + caseína: <strong>{nightProtein}g proteína</strong></div>
            </div>

            <button className="reset-btn" onClick={resetPlan}>Reset plan</button>
          </aside>

          <main className="content-stack">
            <section className="content-card">
              <div className="day-row">
                {Object.entries(plan).map(([key, day]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedDay(key)}
                    className={selectedDay === key ? "day-pill-active" : "day-pill"}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </section>

            <section className="day-layout">
              <div className="content-card">
                <h2 className="section-title">{selected.label}</h2>
                {selected.meals.map((meal, index) => (
                  <div key={`${meal.name}-${index}`} className="meal-card">
                    <div className="meal-grid">
                      <input className="meal-input" value={meal.name} onChange={(e) => updateMeal(selectedDay, index, "name", e.target.value)} />
                      <input className="meal-input" type="number" value={meal.kcal} onChange={(e) => updateMeal(selectedDay, index, "kcal", e.target.value)} />
                      <input className="meal-input" type="number" value={meal.protein} onChange={(e) => updateMeal(selectedDay, index, "protein", e.target.value)} />
                      <input className="meal-input" type="number" value={meal.carbs} onChange={(e) => updateMeal(selectedDay, index, "carbs", e.target.value)} />
                      <input className="meal-input" type="number" value={meal.fat} onChange={(e) => updateMeal(selectedDay, index, "fat", e.target.value)} />
                    </div>
                    <input className="meal-text" value={meal.foods} onChange={(e) => updateMeal(selectedDay, index, "foods", e.target.value)} />
                  </div>
                ))}
              </div>

              <div className="content-stack">
                <section className="summary-card">
                  <h2 className="section-title">Resumen del día</h2>
                  <div className="summary-card-grid">
                    <div className="mini-stat"><div className="mini-label">Kcal</div><div className="mini-value">{selectedTotals.kcal}</div></div>
                    <div className="mini-stat"><div className="mini-label">Proteína</div><div className="mini-value">{selectedTotals.protein}g</div></div>
                    <div className="mini-stat"><div className="mini-label">Carbs</div><div className="mini-value">{selectedTotals.carbs}g</div></div>
                    <div className="mini-stat"><div className="mini-label">Grasas</div><div className="mini-value">{selectedTotals.fat}g</div></div>
                  </div>
                </section>

                <section className="summary-card">
                  <h2 className="section-title">Macros del día</h2>
                  <MacroBar label="Proteína (g)" value={selectedTotals.protein} max={220} color="#22c55e" />
                  <MacroBar label="Carbs (g)" value={selectedTotals.carbs} max={220} color="#3b82f6" />
                  <MacroBar label="Grasas (g)" value={selectedTotals.fat} max={100} color="#f59e0b" />
                </section>
              </div>
            </section>

            <section className="weekly-card">
              <h2 className="section-title">Semana completa</h2>
              <div className="weekly-grid">
                {weeklyRows.map((day) => (
                  <div key={day.key} className="weekly-row">
                    <div className="weekly-label">{day.label}</div>
                    <WeeklyBar label="Kcal" value={day.kcal} max={maxKcal} color="#3b82f6" />
                    <WeeklyBar label="Proteína" value={day.protein} max={maxProtein} color="#22c55e" />
                  </div>
                ))}
              </div>
            </section>

            <section className="helper-grid">
              <div className="helper-card">
                <h4>Desayuno fácil</h4>
                <p>30g de pan + jamón o pavo + 200–250g de PRO+ te deja un desayuno muy sólido y fácil de repetir.</p>
              </div>
              <div className="helper-card">
                <h4>Cena ligera</h4>
                <p>250g de yogur + 30g de caseína encaja genial. La espelta solo cuando realmente te sume.</p>
              </div>
              <div className="helper-card">
                <h4>Running con cabeza</h4>
                <p>Sube carbs en series y tirada larga. El resto de días, prioriza proteína alta y control.</p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
