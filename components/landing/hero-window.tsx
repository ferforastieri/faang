import { Avatar } from "@ui/components/Avatar";
import { AreaChart } from "@ui/components/Charts";
import { Chip } from "@ui/components/Chip";
import { Sidebar } from "@ui/components/Sidebar";
import { StatCard } from "@ui/components/StatCard";

import { BrandLogo } from "@/components/brand/brand-logo";

const MONTHS = [
  { label: "jan", value: 42 },
  { label: "fev", value: 48 },
  { label: "mar", value: 44 },
  { label: "abr", value: 58 },
  { label: "mai", value: 54 },
  { label: "jun", value: 66 },
  { label: "jul", value: 62 },
  { label: "ago", value: 74 },
  { label: "set", value: 70 },
  { label: "out", value: 82 },
  { label: "nov", value: 78 },
  { label: "dez", value: 92 },
];

/**
 * The hero's framed screen: the sidebar, two numbers and the chart, all from
 * the library. It is one window instead of a wall of thumbnails, as the old
 * landing had it.
 */
export function HeroWindow() {
  return (
    <div className="tp-window" aria-hidden="true" inert>
      <div className="tp-window__bar">
        <span className="tp-window__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="tp-window__url">faang.fer.tec.br/dashboard</span>
      </div>

      <div className="tp-window__body">
        <Sidebar
          className="tp-window__side"
          brand={<BrandLogo height={18} />}
          workspace={<span>Acme</span>}
          label="Prévia da navegação"
          sections={[
            {
              key: "main",
              title: "Workspace",
              items: [
                { key: "dash", label: "Dashboard", icon: "chart", chosen: true },
                { key: "chat", label: "Chat", icon: "message" },
                { key: "docs", label: "Docs", icon: "book" },
              ],
            },
            {
              key: "agents",
              title: "Agentes",
              items: [
                {
                  key: "ada",
                  label: "Ada",
                  face: <Avatar kind="agent" name="Ada" appearance={{ color: "sky" }} size="xs" />,
                  count: 3,
                },
                {
                  key: "bento",
                  label: "Bento",
                  face: <Avatar kind="agent" name="Bento" appearance={{ color: "green" }} size="xs" />,
                },
              ],
            },
          ]}
          footer={<Avatar name="Fernando" size="sm" />}
        />

        <div className="tp-window__pane">
          <div className="tp-window__head">
            <span>Dashboard</span>
            <Chip icon="check" tone="done">
              no ritmo
            </Chip>
          </div>

          <div className="tp-window__stats">
            <StatCard label="Receita" value="R$ 48.210" delta="+12,4%" icon="chart" />
            <StatCard label="Pedidos" value="1.284" delta="+6,8%" icon="table" />
          </div>

          <div className="tp-window__chart">
            <AreaChart data={MONTHS} label="Receita nos últimos 12 meses" height={150} />
          </div>
        </div>
      </div>
    </div>
  );
}
