import React, { useEffect, useMemo, useState } from "react";

const FOOD_DB = {
  pan: { label: "Pan", unit: "g", per100: { kcal: 265, protein: 9, carbs: 49, fat: 3.2 }, color: "#f59e0b" },
  jamon: { label: "Jamón", unit: "g", per100: { kcal: 241, protein: 31, carbs: 0.5, fat: 13 }, color: "#ef4444" },
  pavo: { label: "Pavo", unit: "g", per100: { kcal: 110, protein: 24, carbs: 1, fat: 1.5 }, color: "#f97316" },
  yogurPro: { label: "Yogur PRO+", unit: "g", per100: { kcal: 60, protein: 9, carbs: 4, fat: 0.2 }, color: "#2563eb" },
  yogur0: { label: "Yogur 0%", unit: "g", per100: { kcal: 40, protein: 4, carbs: 5, fat: 0.2 }, color: "#0ea5e9" },
  cafe: { label: "Café con leche", unit: "ml", per100: { kcal: 20, protein: 1.5, carbs: 2, fat: 0.2 }, color: "#64748b" },
  platano: { label: "Plátano", unit: "g", per100: { kcal: 89, protein: 1.1, carbs: 23, fat: 0.3 }, color: "#eab308" },
  pollo: { label: "Pollo", unit: "g", per100: { kcal: 165, protein: 31, carbs: 0, fat: 3.6 }, color: "#22c55e" },
  arroz: { label: "Arroz cocido", unit: "g", per100: { kcal: 130, protein: 2.7, carbs: 28, fat: 0.3 }, color: "#10b981" },
  verduras: { label: "Verduras", unit: "g", per100: { kcal: 35, protein: 2, carbs: 6, fat: 0.4 }, color: "#14b8a6" },
  ternera: { label: "Ternera", unit: "g", per100: { kcal: 217, protein: 26, carbs: 0, fat: 12 }, color: "#dc2626" },
  patata: { label: "Patata cocida", unit: "g", per100: { kcal: 87, protein: 1.9, carbs: 20, fat: 0.1 }, color: "#f59e0b" },
  quinoa: { label: "Quinoa cocida", unit: "g", per100: { kcal: 120, protein: 4.4, carbs: 21.3, fat: 1.9 }, color: "#84cc16" },
  huevo: { label: "Huevo", unit: "g", per100: { kcal: 143, protein: 12.6, carbs: 0.7, fat: 9.5 }, color: "#facc15" },
  claras: { label: "Claras", unit: "g", per100: { kcal: 48, protein: 11, carbs: 0.7, fat: 0.2 }, color: "#e5e7eb" },
  quesoBatido: { label: "Queso batido", unit: "g", per100: { kcal: 46, protein: 8, carbs: 4, fat: 0.2 }, color: "#cbd5e1" },
  aguacate: { label: "Aguacate", unit: "g", per100: { kcal: 160, protein: 2, carbs: 9, fat: 15 }, color: "#65a30d" },
  boniato: { label: "Boniato", unit: "g", per100: { kcal: 86, protein: 1.6, carbs: 20, fat: 0.1 }, color: "#f97316" },
  caseina: { label: "Caseína", unit: "g", per100: { kcal: 390, protein: 80, carbs: 6, fat: 3 }, color: "#7c3aed" },
  salmon: { label: "Salmón", unit: "g", per100: { kcal: 208, protein: 20, carbs: 0, fat: 13 }, color: "#fb7185" },
  espelta: { label: "Espelta inflada", unit: "g", per100: { kcal: 372, protein: 8.5, carbs: 77, fat: 2.2 }, color: "#f59e0b" },
  cheat: { label: "Cheat meal", unit: "g", per100: { kcal: 250, protein: 10, carbs: 24, fat: 13 }, color: "#8b5cf6" },
};

const BASE_PLAN = {
  lunes: {
    label: "Lunes · Gym",
    meals: [
      { name: "Desayuno", items: [{ foodId: "pan", grams: 30 }, { foodId: "jamon", grams: 40 }, { foodId: "yogurPro", grams: 250 }, { foodId: "cafe", grams: 200 }] },
      { name: "Comida", items: [{ foodId: "pollo", grams: 180 }, { foodId: "arroz", grams: 220 }, { foodId: "verduras", grams: 250 }] },
      { name: "Merienda", items: [{ foodId: "yogurPro", grams: 250 }] },
      { name: "Cena", items: [{ foodId: "huevo", grams: 150 }, { foodId: "claras", grams: 180 }, { foodId: "verduras", grams: 250 }] },
    ],
  },
  martes: {
    label: "Martes · Series",
    meals: [
      { name: "Desayuno", items: [{ foodId: "pan", grams: 30 }, { foodId: "pavo", grams: 50 }, { foodId: "yogurPro", grams: 250 }, { foodId: "cafe", grams: 200 }, { foodId: "platano", grams: 120 }] },
      { name: "Comida", items: [{ foodId: "ternera", grams: 180 }, { foodId: "patata", grams: 300 }, { foodId: "verduras", grams: 250 }] },
      { name: "Merienda", items: [{ foodId: "yogurPro", grams: 250 }] },
      { name: "Cena", items: [{ foodId: "pollo", grams: 180 }, { foodId: "verduras", grams: 300 }] },
    ],
  },
  miercoles: {
    label: "Miércoles · Gym",
    meals: [
      { name: "Desayuno", items: [{ foodId: "pan", grams: 30 }, { foodId: "jamon", grams: 40 }, { foodId: "yogurPro", grams: 250 }, { foodId: "cafe", grams: 200 }] },
      { name: "Comida", items: [{ foodId: "pavo", grams: 180 }, { foodId: "quinoa", grams: 220 }, { foodId: "verduras", grams: 250 }] },
      { name: "Merienda", items: [{ foodId: "yogurPro", grams: 250 }] },
      { name: "Cena", items: [{ foodId: "ternera", grams: 180 }, { foodId: "verduras", grams: 250 }] },
    ],
  },
  jueves: {
    label: "Jueves · Running suave",
    meals: [
      { name: "Desayuno", items: [{ foodId: "pan", grams: 30 }, { foodId: "pavo", grams: 40 }, { foodId: "yogurPro", grams: 250 }, { foodId: "cafe", grams: 200 }] },
      { name: "Comida", items: [{ foodId: "pollo", grams: 180 }, { foodId: "arroz", grams: 220 }, { foodId: "verduras", grams: 250 }] },
      { name: "Merienda", items: [{ foodId: "pavo", grams: 80 }, { foodId: "yogurPro", grams: 150 }] },
      { name: "Cena", items: [{ foodId: "huevo", grams: 120 }, { foodId: "aguacate", grams: 80 }, { foodId: "verduras", grams: 300 }] },
    ],
  },
  viernes: {
    label: "Viernes · Gym",
    meals: [
      { name: "Desayuno", items: [{ foodId: "pan", grams: 30 }, { foodId: "jamon", grams: 40 }, { foodId: "yogurPro", grams: 250 }, { foodId: "cafe", grams: 200 }] },
      { name: "Comida", items: [{ foodId: "ternera", grams: 180 }, { foodId: "boniato", grams: 260 }, { foodId: "verduras", grams: 250 }] },
      { name: "Merienda", items: [{ foodId: "yogurPro", grams: 250 }] },
      { name: "Cena", items: [{ foodId: "huevo", grams: 150 }, { foodId: "quesoBatido", grams: 250 }] },
    ],
  },
  sabado: {
    label: "Sábado · Descanso activo",
    meals: [
      { name: "Desayuno", items: [{ foodId: "yogurPro", grams: 250 }, { foodId: "caseina", grams: 30 }, { foodId: "cafe", grams: 200 }] },
      { name: "Comida", items: [{ foodId: "cheat", grams: 400 }] },
      { name: "Merienda", items: [{ foodId: "quesoBatido", grams: 250 }] },
      { name: "Cena", items: [{ foodId: "pollo", grams: 200 }, { foodId: "verduras", grams: 250 }] },
    ],
  },
  domingo: {
    label: "Domingo · Tirada larga",
    meals: [
      { name: "Desayuno / Pre", items: [{ foodId: "cafe", grams: 200 }, { foodId: "platano", grams: 120 }] },
      { name: "Comida", items: [{ foodId: "salmon", grams: 180 }, { foodId: "patata", grams: 280 }, { foodId: "verduras", grams: 250 }] },
      { name: "Merienda", items: [{ foodId: "yogurPro", grams: 250 }, { foodId: "espelta", grams: 20 }] },
      { name: "Cena", items: [{ foodId: "huevo", grams: 150 }, { foodId: "pollo", grams: 120 }, { foodId: "verduras", grams: 250 }] },
    ],
  },
};

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function round1(n) {
  return Math.round(n * 10) / 10;
}

function calcItem(item) {
  const food = FOOD_DB[item.foodId];
  if (!food) return { kcal: 0, protein: 0, carbs: 0, fat: 0 };
  const factor = item.grams / 100;
  return {
    kcal: round1(food.per100.kcal * factor),
    protein: round1(food.per100.protein * factor),
    carbs: round1(food.per100.carbs * factor),
    fat: round1(food.per100.fat * factor),
  };
}

function calcMeal(meal) {
  return meal.items.reduce(
    (acc, item) => {
      const macros = calcItem(item);
      return {
        kcal: round1(acc.kcal + macros.kcal),
        protein: round1(acc.protein + macros.protein),
        carbs: round1(acc.carbs + macros.carbs),
        fat: round1(acc.fat + macros.fat),
      };
    },
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

function calcDay(day) {
  return day.meals.reduce(
    (acc, meal) => {
      const totals = calcMeal(meal);
      return {
        kcal: round1(acc.kcal + totals.kcal),
        protein: round1(acc.protein + totals.protein),
        carbs: round1(acc.carbs + totals.carbs),
        fat: round1(acc.fat + totals.fat),
      };
    },
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

function calcWeeklyAverages(rows) {
  const total = rows.reduce(
    (acc, row) => ({
      kcal: acc.kcal + row.kcal,
      protein: acc.protein + row.protein,
      carbs: acc.carbs + row.carbs,
      fat: acc.fat + row.fat,
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  );
  return {
    kcal: Math.round(total.kcal / rows.length),
    protein: Math.round(total.protein / rows.length),
    carbs: Math.round(total.carbs / rows.length),
    fat: Math.round(total.fat / rows.length),
  };
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

function FoodChip({ item }) {
  const food = FOOD_DB[item.foodId];
  return (
    <div className="food-chip" style={{ borderColor: food.color }}>
      <span className="food-chip-dot" style={{ background: food.color }} />
      <span>{food.label}</span>
      <strong>{item.grams}{food.unit}</strong>
    </div>
  );
}

function IngredientRow({ item, onChangeFood, onChangeGrams, onRemove, canRemove }) {
  const food = FOOD_DB[item.foodId];
  const macros = calcItem(item);
  return (
    <div className="ingredient-row">
      <select className="select" value={item.foodId} onChange={(e) => onChangeFood(e.target.value)}>
        {Object.entries(FOOD_DB).map(([key, value]) => (
          <option key={key} value={key}>{value.label}</option>
        ))}
      </select>
      <input className="input" type="number" value={item.grams} onChange={(e) => onChangeGrams(Number(e.target.value || 0))} />
      <div className="ingredient-meta">{food.unit}</div>
      <div className="ingredient-macros">{Math.round(macros.kcal)} kcal · P {round1(macros.protein)} · C {round1(macros.carbs)} · G {round1(macros.fat)}</div>
      <button className="tiny-btn" onClick={onRemove} disabled={!canRemove}>✕</button>
    </div>
  );
}

export default function App() {
  const [weight, setWeight] = useState(86);
  const [proteinRatio, setProteinRatio] = useState(2);
  const [mode, setMode] = useState("Definición agresiva");
  const [selectedDay, setSelectedDay] = useState("lunes");
  const [plan, setPlan] = useState(() => {
    const saved = localStorage.getItem("gym-plan-pro-v1");
    return saved ? JSON.parse(saved) : clone(BASE_PLAN);
  });

  useEffect(() => {
    localStorage.setItem("gym-plan-pro-v1", JSON.stringify(plan));
  }, [plan]);

  const proteinTarget = Math.round(weight * proteinRatio);

  const weeklyRows = useMemo(() => {
    const kcalAdjustment = mode === "Definición agresiva" ? -120 : mode === "Recomposición" ? 0 : 180;
    return Object.entries(plan).map(([key, day]) => {
      const totals = calcDay(day);
      return {
        key,
        label: day.label,
        kcal: Math.round(totals.kcal + kcalAdjustment),
        protein: Math.round(totals.protein),
        carbs: Math.round(totals.carbs),
        fat: Math.round(totals.fat),
      };
    });
  }, [plan, mode]);

  const weeklyAverage = useMemo(() => calcWeeklyAverages(weeklyRows), [weeklyRows]);
  const selected = plan[selectedDay];
  const selectedTotals = calcDay(selected);
  const proteinCoverage = Math.min(100, Math.round((weeklyAverage.protein / proteinTarget) * 100));

  function updateItem(dayKey, mealIndex, itemIndex, field, value) {
    setPlan((prev) => {
      const next = clone(prev);
      next[dayKey].meals[mealIndex].items[itemIndex][field] = value;
      return next;
    });
  }

  function updateMealName(dayKey, mealIndex, value) {
    setPlan((prev) => {
      const next = clone(prev);
      next[dayKey].meals[mealIndex].name = value;
      return next;
    });
  }

  function addIngredient(dayKey, mealIndex) {
    setPlan((prev) => {
      const next = clone(prev);
      next[dayKey].meals[mealIndex].items.push({ foodId: "pollo", grams: 100 });
      return next;
    });
  }

  function removeIngredient(dayKey, mealIndex, itemIndex) {
    setPlan((prev) => {
      const next = clone(prev);
      const items = next[dayKey].meals[mealIndex].items;
      if (items.length > 1) items.splice(itemIndex, 1);
      return next;
    });
  }

  function resetPlan() {
    setPlan(clone(BASE_PLAN));
    localStorage.removeItem("gym-plan-pro-v1");
  }

  const maxKcal = Math.max(...weeklyRows.map((d) => d.kcal), 1);
  const maxProtein = Math.max(...weeklyRows.map((d) => d.protein), proteinTarget, 1);

  return (
    <>
      <style>{`
        :root {
          --bg: #f4f7fb;
          --card: rgba(255,255,255,0.9);
          --text: #152033;
          --muted: #61708a;
          --line: #dbe3ee;
          --navy: #163a70;
          --blue: #3b82f6;
          --cyan: #14b8a6;
          --orange: #f59e0b;
          --green: #22c55e;
          --shadow: 0 18px 45px rgba(22, 58, 112, 0.10);
          --radius-xl: 28px;
          --radius-lg: 20px;
          --radius-md: 14px;
        }
        * { box-sizing: border-box; }
        html, body, #root { margin: 0; min-height: 100%; width: 100%; }
        body {
          overflow-x: hidden;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          color: var(--text);
          background:
            radial-gradient(circle at top left, rgba(20,184,166,0.12), transparent 24%),
            radial-gradient(circle at top right, rgba(59,130,246,0.10), transparent 28%),
            linear-gradient(180deg, #f8fbff 0%, var(--bg) 100%);
        }
        .app-shell { width: 100%; max-width: 1400px; margin: 0 auto; padding: 18px; }
        .hero,.panel,.content-card,.summary-card,.weekly-card { background: var(--card); backdrop-filter: blur(14px); border: 1px solid rgba(255,255,255,0.7); box-shadow: var(--shadow); }
        .hero { border-radius: var(--radius-xl); padding: 22px; margin-bottom: 20px; }
        .badge-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 14px; }
        .badge-primary,.badge-secondary,.day-pill,.day-pill-active { border-radius: 999px; padding: 10px 16px; font-size: 14px; font-weight: 700; border: none; }
        .badge-primary { background: linear-gradient(135deg, var(--navy), var(--blue)); color: white; }
        .badge-secondary { background: #eef4fb; color: var(--text); border: 1px solid var(--line); }
        .hero h1 { margin: 0; font-size: clamp(2rem, 4vw, 3.6rem); line-height: 1; letter-spacing: -0.03em; }
        .hero p { color: var(--muted); font-size: clamp(1rem, 2vw, 1.2rem); line-height: 1.65; max-width: 920px; margin: 12px 0 0; }
        .stats-grid { margin-top: 20px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
        .stat-card { background: linear-gradient(180deg, rgba(255,255,255,0.92), rgba(246,249,253,0.92)); border: 1px solid var(--line); border-radius: 22px; padding: 16px; }
        .stat-label { color: var(--muted); font-size: 14px; }
        .stat-value { margin-top: 8px; font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 800; }
        .main-grid { display: grid; grid-template-columns: minmax(280px, 340px) minmax(0, 1fr); gap: 20px; align-items: start; }
        .panel,.content-card,.summary-card,.weekly-card { border-radius: var(--radius-xl); padding: 20px; }
        .panel-title,.section-title { margin: 0 0 14px; font-size: 1.8rem; letter-spacing: -0.03em; }
        .input-block { margin-bottom: 14px; }
        .label { display: block; margin-bottom: 6px; font-size: 14px; font-weight: 700; color: var(--muted); }
        .input,.select,.meal-input,.meal-text { width: 100%; border: 1px solid var(--line); border-radius: 14px; padding: 12px 14px; font-size: 15px; background: white; color: var(--text); outline: none; transition: 0.2s ease; }
        .input:focus,.select:focus,.meal-input:focus,.meal-text:focus { border-color: var(--blue); box-shadow: 0 0 0 4px rgba(59,130,246,0.12); }
        .quick-card { margin-top: 18px; background: linear-gradient(135deg, var(--navy), #244c8a); color: white; border-radius: 20px; padding: 16px; }
        .quick-card small { opacity: 0.8; }
        .quick-card strong { color: #c7f9f1; }
        .reset-btn,.add-btn { width: 100%; margin-top: 16px; border: none; border-radius: 16px; background: linear-gradient(135deg, var(--cyan), var(--blue)); color: white; font-weight: 800; padding: 14px; cursor: pointer; transition: transform 0.15s ease, opacity 0.15s ease; }
        .add-btn { width: auto; padding: 10px 14px; margin-top: 10px; font-size: 14px; }
        .tiny-btn { border: none; border-radius: 12px; background: #fee2e2; color: #991b1b; font-weight: 800; padding: 10px 12px; cursor: pointer; }
        .tiny-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .reset-btn:hover,.add-btn:hover { transform: translateY(-1px); opacity: 0.96; }
        .content-stack { display: grid; gap: 20px; }
        .day-row { display: flex; gap: 10px; flex-wrap: wrap; }
        .day-pill,.day-pill-active { cursor: pointer; transition: 0.18s ease; }
        .day-pill { background: white; color: var(--text); border: 1px solid var(--line); }
        .day-pill:hover { transform: translateY(-1px); border-color: var(--blue); }
        .day-pill-active { background: linear-gradient(135deg, var(--navy), var(--blue)); color: white; }
        .day-layout { display: grid; grid-template-columns: minmax(0, 1.2fr) 320px; gap: 20px; }
        .meal-card { border: 1px solid var(--line); background: linear-gradient(180deg, rgba(255,255,255,0.94), rgba(244,248,253,0.88)); border-radius: 22px; padding: 14px; margin-bottom: 14px; }
        .meal-header { display:flex; justify-content: space-between; align-items:center; gap: 12px; margin-bottom: 10px; }
        .meal-summary { display: flex; gap: 8px; flex-wrap: wrap; }
        .mini-pill { background: white; border: 1px solid var(--line); border-radius: 999px; padding: 6px 10px; font-size: 12px; font-weight: 700; }
        .ingredient-list { display: grid; gap: 10px; }
        .ingredient-row { display: grid; grid-template-columns: minmax(140px, 1.2fr) 90px 70px minmax(220px, 1fr) 48px; gap: 8px; align-items: center; }
        .ingredient-meta { text-align: center; font-size: 13px; color: var(--muted); background: #f8fafc; border: 1px solid var(--line); border-radius: 12px; padding: 12px 8px; }
        .ingredient-macros { font-size: 13px; color: var(--muted); background: white; border: 1px solid var(--line); border-radius: 12px; padding: 12px; }
        .food-chip-list { display:flex; gap:8px; flex-wrap:wrap; margin: 10px 0 6px; }
        .food-chip { display:flex; align-items:center; gap:8px; border:1px solid var(--line); background:white; border-radius:999px; padding: 7px 10px; font-size:13px; }
        .food-chip strong { font-size: 12px; }
        .food-chip-dot { width: 10px; height: 10px; border-radius: 999px; display:inline-block; }
        .summary-card-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
        .mini-stat { background: white; border: 1px solid var(--line); border-radius: 18px; padding: 14px; }
        .mini-label { color: var(--muted); font-size: 14px; }
        .mini-value { font-size: 2rem; font-weight: 800; margin-top: 8px; }
        .macro-row,.weekly-bar { margin-bottom: 14px; }
        .macro-head,.weekly-bar-head { display: flex; justify-content: space-between; gap: 10px; margin-bottom: 6px; font-size: 14px; }
        .macro-track,.weekly-bar-track { width: 100%; height: 14px; border-radius: 999px; background: #eaf0f7; overflow: hidden; }
        .macro-fill,.weekly-bar-fill { height: 100%; border-radius: 999px; transition: width 0.28s ease; }
        .weekly-grid { display: grid; gap: 14px; }
        .weekly-row { display: grid; grid-template-columns: 180px 1fr 1fr; gap: 14px; align-items: center; }
        .weekly-label { font-weight: 800; color: var(--text); }
        .helper-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-top: 20px; }
        .helper-card { border-radius: 22px; padding: 18px; border: 1px solid var(--line); background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(245,249,253,0.9)); }
        .helper-card h4 { margin: 0 0 8px; font-size: 1.05rem; }
        .helper-card p { margin: 0; color: var(--muted); line-height: 1.55; }
        @media (max-width: 1100px) {
          .main-grid,.day-layout { grid-template-columns: 1fr; }
          .stats-grid,.helper-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .weekly-row { grid-template-columns: 1fr; }
          .ingredient-row { grid-template-columns: 1fr 100px 70px 1fr 48px; }
        }
        @media (max-width: 760px) {
          .app-shell { padding: 12px; }
          .hero,.panel,.content-card,.summary-card,.weekly-card { padding: 16px; border-radius: 22px; }
          .stats-grid,.helper-grid,.summary-card-grid { grid-template-columns: 1fr; }
          .ingredient-row { grid-template-columns: 1fr; }
          .hero p { font-size: 1rem; }
          .mini-value { font-size: 1.7rem; }
        }
        @media (max-width: 520px) {
          .hero h1 { line-height: 1.05; }
          .day-row { display: grid; grid-template-columns: 1fr 1fr; }
          .day-pill,.day-pill-active { width: 100%; text-align: center; }
          .meal-header { flex-direction: column; align-items: stretch; }
        }
      `}</style>

      <div className="app-shell">
        <section className="hero">
          <div className="badge-row">
            <span className="badge-primary">Definición PRO</span>
            <span className="badge-secondary">Con gramos reales</span>
            <span className="badge-secondary">Macros automáticos</span>
          </div>
          <h1>Plan semanal interactivo</h1>
          <p>
            Ahora sí: cada comida tiene ingredientes con gramos reales. La web calcula automáticamente kcal, proteína, carbs y grasas,
            y puedes tocar cantidades sin recalcular nada a mano.
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
            <div className="quick-card">
              <small>Cómo funciona</small>
              <div style={{ marginTop: 10 }}>Cada ingrediente tiene su valor nutricional por 100g.</div>
              <div style={{ marginTop: 8 }}>Cambia gramos y los macros se recalculan solos.</div>
              <div style={{ marginTop: 8 }}>Los cambios se guardan en tu navegador.</div>
            </div>
            <button className="reset-btn" onClick={resetPlan}>Reset plan</button>
          </aside>

          <main className="content-stack">
            <section className="content-card">
              <div className="day-row">
                {Object.entries(plan).map(([key, day]) => (
                  <button key={key} onClick={() => setSelectedDay(key)} className={selectedDay === key ? "day-pill-active" : "day-pill"}>
                    {day.label}
                  </button>
                ))}
              </div>
            </section>

            <section className="day-layout">
              <div className="content-card">
                <h2 className="section-title">{selected.label}</h2>
                {selected.meals.map((meal, mealIndex) => {
                  const mealTotals = calcMeal(meal);
                  return (
                    <div key={`${meal.name}-${mealIndex}`} className="meal-card">
                      <div className="meal-header">
                        <input className="meal-input" value={meal.name} onChange={(e) => updateMealName(selectedDay, mealIndex, e.target.value)} />
                        <div className="meal-summary">
                          <span className="mini-pill">{Math.round(mealTotals.kcal)} kcal</span>
                          <span className="mini-pill">P {round1(mealTotals.protein)}</span>
                          <span className="mini-pill">C {round1(mealTotals.carbs)}</span>
                          <span className="mini-pill">G {round1(mealTotals.fat)}</span>
                        </div>
                      </div>

                      <div className="food-chip-list">
                        {meal.items.map((item, itemIndex) => (
                          <FoodChip key={`${item.foodId}-${itemIndex}`} item={item} />
                        ))}
                      </div>

                      <div className="ingredient-list">
                        {meal.items.map((item, itemIndex) => (
                          <IngredientRow
                            key={`${item.foodId}-${itemIndex}`}
                            item={item}
                            onChangeFood={(value) => updateItem(selectedDay, mealIndex, itemIndex, "foodId", value)}
                            onChangeGrams={(value) => updateItem(selectedDay, mealIndex, itemIndex, "grams", value)}
                            onRemove={() => removeIngredient(selectedDay, mealIndex, itemIndex)}
                            canRemove={meal.items.length > 1}
                          />
                        ))}
                      </div>

                      <button className="add-btn" onClick={() => addIngredient(selectedDay, mealIndex)}>+ Añadir ingrediente</button>
                    </div>
                  );
                })}
              </div>

              <div className="content-stack">
                <section className="summary-card">
                  <h2 className="section-title">Resumen del día</h2>
                  <div className="summary-card-grid">
                    <div className="mini-stat"><div className="mini-label">Kcal</div><div className="mini-value">{Math.round(selectedTotals.kcal)}</div></div>
                    <div className="mini-stat"><div className="mini-label">Proteína</div><div className="mini-value">{Math.round(selectedTotals.protein)}g</div></div>
                    <div className="mini-stat"><div className="mini-label">Carbs</div><div className="mini-value">{Math.round(selectedTotals.carbs)}g</div></div>
                    <div className="mini-stat"><div className="mini-label">Grasas</div><div className="mini-value">{Math.round(selectedTotals.fat)}g</div></div>
                  </div>
                </section>

                <section className="summary-card">
                  <h2 className="section-title">Macros del día</h2>
                  <MacroBar label="Proteína (g)" value={Math.round(selectedTotals.protein)} max={220} color="#22c55e" />
                  <MacroBar label="Carbs (g)" value={Math.round(selectedTotals.carbs)} max={220} color="#3b82f6" />
                  <MacroBar label="Grasas (g)" value={Math.round(selectedTotals.fat)} max={100} color="#f59e0b" />
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
                <h4>Ahora sí ves gramos</h4>
                <p>Cada ingrediente sale con sus gramos y puedes cambiarlos uno a uno. Ya no es solo texto descriptivo.</p>
              </div>
              <div className="helper-card">
                <h4>Macros automáticos</h4>
                <p>Si subes pollo, yogur o arroz, la app recalcula al instante kcal, proteína, carbs y grasas.</p>
              </div>
              <div className="helper-card">
                <h4>Más nivel producto</h4>
                <p>Los cambios se guardan solos en localStorage, así no pierdes el plan al recargar la página.</p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
