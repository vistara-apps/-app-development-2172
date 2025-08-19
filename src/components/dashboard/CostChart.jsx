import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export function CostChart({ subscriptions }) {
  const data = subscriptions.map((sub, index) => ({
    name: sub.serviceName,
    value: parseFloat(sub.cost),
    color: COLORS[index % COLORS.length]
  }));

  const totalCost = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`$${value}`, 'Cost']}
            contentStyle={{ 
              backgroundColor: 'hsl(220, 13%, 18%)', 
              border: '1px solid hsl(0, 0%, 75%)',
              borderRadius: '8px',
              color: 'hsl(0, 0%, 95%)'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center mt-4">
        <p className="text-heading2">${totalCost.toFixed(2)}</p>
        <p className="text-text-secondary text-caption">Total Monthly Cost</p>
      </div>
    </div>
  );
}