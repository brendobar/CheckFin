'use client'

import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import {useState, useCallback, useEffect} from "react";
import styles from './categoryChart.module.css'
import classNames from "classnames";
import {Spin} from "antd";


type CategoryChartProps = {
    data: {
        name: string
        value: number
    }[]
    title?: string
    customClass?: string
    loading?: boolean
}

const CategoryChart = ({data, title, customClass, loading}: CategoryChartProps) => {
    const [activeCategory, setActiveCategory] = useState(0);
    const renderActiveShape = useCallback((props:any) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 2;
        const ey = my;
        const textAnchor = cos >= 0 ? "start" : "end";

        return (
            <g>
                <text
                    x={cx}
                    y={cy}
                    dy={8}
                    textAnchor="middle"
                    fill='var(--text)'
                    fontSize={16}
                >
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="var(--text)">
                    {value}
                </text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="var(--link)">
                    {`${(percent * 100).toFixed(2)}%`}
                </text>
            </g>
        );
    }, []);

    const [chartSize, setChartSize] = useState({ inner: 100, outer: 120 });

    useEffect(() => {
        const updateSize = () => {
            const width = window.innerWidth
            if (width <= 767) {
                setChartSize({ inner: 50, outer: 60 })
            } else {
                setChartSize({ inner: 100, outer: 120 })
            }
        };
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    if(loading){
        return (
            <div className={classNames(styles.loading, customClass)}>
                <Spin/>
            </div>
        )
    }

    if(!data || data.length == 0) return null


    return (
        <div className={classNames(styles.chart, customClass)}>
            <p className={styles.title}>{title}</p>
            <ResponsiveContainer height={450}>
                <PieChart>
                    <Pie
                        activeIndex={activeCategory}
                        activeShape={renderActiveShape}
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={chartSize.inner}
                        outerRadius={chartSize.outer}
                        fill="var(--accent)"
                        dataKey="value"
                        labelLine={true}
                        onMouseEnter={(_, index) => setActiveCategory(index)}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CategoryChart;
