"use client";

import { ApprovalCard } from "@ui/components/ApprovalCard";
import { Avatar } from "@ui/components/Avatar";
import { Button } from "@ui/components/Button";
import { Chip } from "@ui/components/Chip";
import { FactStrip } from "@ui/components/FactStrip";
import { Icon } from "@ui/icons/Icon";
import { useState } from "react";

const VALUES = [42, 48, 44, 58, 54, 66, 62, 74, 70, 82, 78, 92];
const POINTS = VALUES.map((value, index) => `${24 + index * 53},${196 - value * 1.7}`);
const AREA = `M24,196 L${POINTS.join(" L")} L${24 + (VALUES.length - 1) * 53},196 Z`;

const STATS = [
  { label: "Receita", value: "R$ 48.210", delta: "+12,4%", up: true, icon: "chart" as const },
  { label: "Pedidos", value: "1.284", delta: "+6,8%", up: true, icon: "table" as const },
  { label: "Tempo do agente", value: "3,2 s", delta: "−18%", up: true, icon: "bolt" as const },
  { label: "Aprovações", value: "4", delta: "aguardando você", tone: "wait", icon: "approve" as const },
];

const RUNS = [
  { agent: "Ada", color: "sky" as const, action: "Abriu o PR #42", time: "09:12", state: "Concluído", tone: "done" as const },
  { agent: "Bento", color: "green" as const, action: "Importou 1.204 pedidos", time: "08:54", state: "Concluído", tone: "done" as const },
  { agent: "Cora", color: "rose" as const, action: "Publicou o relatório", time: "08:31", state: "Aguardando", tone: "waiting" as const },
  { agent: "Ada", color: "sky" as const, action: "Rodou os testes do parser", time: "08:02", state: "Concluído", tone: "done" as const },
];

export function DashboardView() {
  const [first, setFirst] = useState<"waiting" | "approved">("waiting");
  const [second, setSecond] = useState<"waiting" | "approved">("waiting");

  return (
    <div className="tp-dash">
      <div className="tp-dash__stats">
        {STATS.map((stat) => (
          <div key={stat.label} className="tp-stat">
            <span className="tp-stat__label">
              <Icon name={stat.icon} size={14} />
              {stat.label}
            </span>
            <div className="tp-stat__value">{stat.value}</div>
            <span className={`tp-stat__delta${stat.tone === "wait" ? " tp-stat__delta--wait" : ""}`}>
              {stat.tone === "wait" ? <Icon name="waiting" size={14} /> : <Icon name="check" size={14} />}
              {stat.delta}
            </span>
          </div>
        ))}
      </div>

      <div className="tp-dash__chart">
        <div className="tp-panel__head">
          <h2>Receita</h2>
          <Chip icon="check" tone="done">
            no ritmo
          </Chip>
          <span>últimos 12 meses</span>
        </div>

        <svg className="tp-chart" viewBox="0 0 620 220" role="img" aria-label="Receita dos últimos 12 meses, subindo de 42 a 92">
          <defs>
            <linearGradient id="tp-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--agent)" stopOpacity="0.26" />
              <stop offset="100%" stopColor="var(--agent)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[40, 80, 120, 160].map((y) => (
            <line key={y} x1="24" x2="602" y1={y} y2={y} stroke="var(--line)" strokeWidth="1" />
          ))}

          <path d={AREA} fill="url(#tp-area)" />
          <polyline points={POINTS.join(" ")} fill="none" stroke="var(--agent)" strokeWidth="2" strokeLinejoin="round" />
          {VALUES.map((value, index) => (
            <circle
              key={index}
              cx={24 + index * 53}
              cy={196 - value * 1.7}
              r={index === VALUES.length - 1 ? 4 : 2.5}
              fill="var(--agent)"
            />
          ))}
        </svg>

        <FactStrip
          facts={[
            { key: "mrr", icon: "chart", label: "MRR", value: "R$ 48,2 mil" },
            { key: "growth", icon: "bolt", label: "Crescimento", value: "+12,4%" },
            { key: "churn", icon: "alert", label: "Churn", value: "1,8%" },
          ]}
        />
      </div>

      <div className="tp-dash__aside">
        <ApprovalCard
          status={first}
          who={<><b>Ada</b> pede aprovação</>}
          statusLabel={first === "approved" ? "Aprovado por você · agora" : "Aguardando você"}
          title={first === "approved" ? undefined : "Fazer merge do PR #42"}
          detail="github · acme/web"
          actions={
            first === "waiting" ? (
              <Button variant="primary" size="sm" onClick={() => setFirst("approved")}>
                Aprovar
              </Button>
            ) : undefined
          }
          compact={first === "approved"}
        />

        <ApprovalCard
          status={second}
          who={<><b>Cora</b> pede aprovação</>}
          statusLabel={second === "approved" ? "Aprovado por você · agora" : "Expira em 23 h"}
          title={second === "approved" ? undefined : "Publicar o relatório de setembro"}
          detail="notion · acme/relatórios"
          actions={
            second === "waiting" ? (
              <Button variant="primary" size="sm" onClick={() => setSecond("approved")}>
                Aprovar
              </Button>
            ) : undefined
          }
          compact={second === "approved"}
        />

        <div className="tp-stat">
          <span className="tp-stat__label">
            <Icon name="chart" size={14} />
            Uso do plano
          </span>
          <div className="tp-meter">
            <div className="tp-meter__row">
              <span>Semana</span>
              <span>62%</span>
            </div>
            <span className="tp-meter__bar">
              <i style={{ width: "62%" }} />
            </span>
            <div className="tp-meter__row">
              <span>5 horas</span>
              <span>31%</span>
            </div>
            <span className="tp-meter__bar">
              <i style={{ width: "31%" }} />
            </span>
          </div>
        </div>
      </div>

      <div className="tp-dash__table">
        <div className="tp-panel__head" style={{ padding: "16px 16px 0" }}>
          <h2>Últimas execuções</h2>
          <a href="/chat" style={{ marginInlineStart: "auto", color: "var(--agent)", fontSize: 13, textDecoration: "none" }}>
            Abrir o chat
          </a>
        </div>
        <table className="tp-table">
          <thead>
            <tr>
              <th>Agente</th>
              <th>Ação</th>
              <th>Hora</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {RUNS.map((run) => (
              <tr key={`${run.agent}-${run.time}`}>
                <td>
                  <span className="tp-table__agent">
                    <Avatar kind="agent" name={run.agent} appearance={{ color: run.color }} size="xs" />
                    {run.agent}
                  </span>
                </td>
                <td>{run.action}</td>
                <td>{run.time}</td>
                <td>
                  <Chip icon={run.tone === "done" ? "check" : "waiting"} tone={run.tone}>
                    {run.state}
                  </Chip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
