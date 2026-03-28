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

function Bar({ label, value, max, color }) {
  const percent = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 14 }}>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div style={{ width: "100%", height: 12, background: "#e5e7eb", borderRadius: 999 }}>
        <div
          style={{
            width: `${Math.min(percent, 100)}%`,
            height: "100%",
            background: color,
            borderRadius: 999,
            transition: "width 0.3s ease",
          }}
        />
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
    <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: "Arial, sans-serif", color: "#111827" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: 24 }}>
        <div style={{ background: "white", borderRadius: 24, padding: 24, boxShadow: "0 10px 30px rgba(0,0,0,0.08)", marginBottom: 24 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
            <span style={badgeStyle}>Definición</span>
            <span style={badgeStyleSecondary}>3 gym + 3 running</span>
            <span style={badgeStyleSecondary}>Alta proteína</span>
          </div>
          <h1 style={{ margin: 0, fontSize: 42 }}>Plan semanal interactivo</h1>
          <p style={{ color: "#4b5563", maxWidth: 900, lineHeight: 1.6 }}>
            Web sencilla y desplegable en GitHub Pages. Pensada para perder grasa manteniendo músculo: proteína alta, desayuno realista con tu bocata y yogur, cena ligera con yogur + caseína cuando toque y una cheat meal controlada.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginTop: 20 }}>
            <div style={statCard}><div style={statLabel}>Kcal medias</div><div style={statValue}>{weeklyAverage.kcal}</div></div>
            <div style={statCard}><div style={statLabel}>Proteína objetivo</div><div style={statValue}>{proteinTarget}g</div></div>
            <div style={statCard}><div style={statLabel}>Proteína media</div><div style={statValue}>{weeklyAverage.protein}g</div></div>
            <div style={statCard}><div style={statLabel}>Cobertura</div><div style={statValue}>{proteinCoverage}%</div></div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 24 }}>
          <div style={{ background: "white", borderRadius: 24, padding: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.08)", alignSelf: "start" }}>
            <h2 style={{ marginTop: 0 }}>Panel de control</h2>

            <label style={labelStyle}>Peso (kg)</label>
            <input style={inputStyle} type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value || 0))} />

            <label style={labelStyle}>Proteína por kg</label>
            <input style={inputStyle} type="number" step="0.1" min="1.6" max="2.5" value={proteinRatio} onChange={(e) => setProteinRatio(Number(e.target.value || 0))} />

            <label style={labelStyle}>Modo</label>
            <select style={inputStyle} value={mode} onChange={(e) => setMode(e.target.value)}>
              <option>Definición agresiva</option>
              <option>Recomposición</option>
              <option>Mantenimiento</option>
            </select>

            <label style={labelStyle}>Tipo de yogur</label>
            <select style={inputStyle} value={yogurtType} onChange={(e) => setYogurtType(e.target.value)}>
              <option>PRO+</option>
              <option>Pastoret 0%</option>
            </select>

            <label style={labelStyle}>Yogur desayuno (g)</label>
            <input style={inputStyle} type="number" value={breakfastYogurt} onChange={(e) => setBreakfastYogurt(Number(e.target.value || 0))} />

            <label style={labelStyle}>Yogur noche (g)</label>
            <input style={inputStyle} type="number" value={nightYogurt} onChange={(e) => setNightYogurt(Number(e.target.value || 0))} />

            <label style={labelStyle}>Caseína noche (g)</label>
            <input style={inputStyle} type="number" value={caseinNight} onChange={(e) => setCaseinNight(Number(e.target.value || 0))} />

            <div style={{ marginTop: 20, padding: 16, background: "#111827", color: "white", borderRadius: 18 }}>
              <div style={{ marginBottom: 10, fontSize: 14, opacity: 0.85 }}>Cálculos rápidos</div>
              <div style={{ marginBottom: 8 }}>Desayuno: <strong>{breakfastProtein}g proteína</strong></div>
              <div>Cena yogur + caseína: <strong>{nightProtein}g proteína</strong></div>
            </div>

            <button style={buttonSecondary} onClick={resetPlan}>Reset plan</button>
          </div>

          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
              {Object.entries(plan).map(([key, day]) => (
                <button
                  key={key}
                  onClick={() => setSelectedDay(key)}
                  style={selectedDay === key ? tabActiveStyle : tabStyle}
                >
                  {day.label}
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 24 }}>
              <div style={{ background: "white", borderRadius: 24, padding: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
                <h2 style={{ marginTop: 0 }}>{selected.label}</h2>
                {selected.meals.map((meal, index) => (
                  <div key={`${meal.name}-${index}`} style={{ border: "1px solid #e5e7eb", borderRadius: 18, padding: 14, marginBottom: 14 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1.4fr repeat(4, 90px)", gap: 10, marginBottom: 10 }}>
                      <input style={inputStyle} value={meal.name} onChange={(e) => updateMeal(selectedDay, index, "name", e.target.value)} />
                      <input style={inputStyle} type="number" value={meal.kcal} onChange={(e) => updateMeal(selectedDay, index, "kcal", e.target.value)} />
                      <input style={inputStyle} type="number" value={meal.protein} onChange={(e) => updateMeal(selectedDay, index, "protein", e.target.value)} />
                      <input style={inputStyle} type="number" value={meal.carbs} onChange={(e) => updateMeal(selectedDay, index, "carbs", e.target.value)} />
                      <input style={inputStyle} type="number" value={meal.fat} onChange={(e) => updateMeal(selectedDay, index, "fat", e.target.value)} />
                    </div>
                    <input style={inputStyle} value={meal.foods} onChange={(e) => updateMeal(selectedDay, index, "foods", e.target.value)} />
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gap: 24 }}>
                <div style={{ background: "white", borderRadius: 24, padding: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
                  <h3 style={{ marginTop: 0 }}>Resumen del día</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div style={miniCard}><div style={statLabel}>Kcal</div><div style={miniValue}>{selectedTotals.kcal}</div></div>
                    <div style={miniCard}><div style={statLabel}>Proteína</div><div style={miniValue}>{selectedTotals.protein}g</div></div>
                    <div style={miniCard}><div style={statLabel}>Carbs</div><div style={miniValue}>{selectedTotals.carbs}g</div></div>
                    <div style={miniCard}><div style={statLabel}>Grasas</div><div style={miniValue}>{selectedTotals.fat}g</div></div>
                  </div>
                </div>

                <div style={{ background: "white", borderRadius: 24, padding: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
                  <h3 style={{ marginTop: 0 }}>Macros del día</h3>
                  <Bar label="Proteína (g)" value={selectedTotals.protein} max={220} color="#111827" />
                  <Bar label="Carbs (g)" value={selectedTotals.carbs} max={220} color="#2563eb" />
                  <Bar label="Grasas (g)" value={selectedTotals.fat} max={100} color="#d97706" />
                </div>
              </div>
            </div>

            <div style={{ background: "white", borderRadius: 24, padding: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.08)", marginTop: 24 }}>
              <h2 style={{ marginTop: 0 }}>Semana completa</h2>
              {weeklyRows.map((day) => (
                <div key={day.key} style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr", gap: 14, alignItems: "center", marginBottom: 16 }}>
                  <strong>{day.label}</strong>
                  <Bar label="Kcal" value={day.kcal} max={maxKcal} color="#111827" />
                  <Bar label="Proteína" value={day.protein} max={maxProtein} color="#16a34a" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const badgeStyle = {
  display: "inline-block",
  background: "#111827",
  color: "white",
  padding: "8px 14px",
  borderRadius: 999,
  fontSize: 14,
};

const badgeStyleSecondary = {
  display: "inline-block",
  background: "#f3f4f6",
  color: "#111827",
  padding: "8px 14px",
  borderRadius: 999,
  fontSize: 14,
  border: "1px solid #e5e7eb",
};

const statCard = {
  background: "#f9fafb",
  borderRadius: 18,
  padding: 16,
};

const statLabel = {
  fontSize: 14,
  color: "#6b7280",
};

const statValue = {
  fontSize: 30,
  fontWeight: 700,
  marginTop: 6,
};

const miniCard = {
  background: "#f9fafb",
  borderRadius: 18,
  padding: 14,
};

const miniValue = {
  fontSize: 26,
  fontWeight: 700,
  marginTop: 6,
};

const labelStyle = {
  display: "block",
  fontSize: 14,
  color: "#374151",
  marginBottom: 6,
  marginTop: 14,
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid #d1d5db",
  fontSize: 14,
};

const buttonSecondary = {
  width: "100%",
  marginTop: 16,
  padding: "12px 14px",
  background: "white",
  border: "1px solid #d1d5db",
  borderRadius: 14,
  cursor: "pointer",
  fontWeight: 600,
};

const tabStyle = {
  padding: "10px 14px",
  background: "white",
  border: "1px solid #d1d5db",
  borderRadius: 999,
  cursor: "pointer",
};

const tabActiveStyle = {
  padding: "10px 14px",
  background: "#111827",
  color: "white",
  border: "1px solid #111827",
  borderRadius: 999,
  cursor: "pointer",
};
