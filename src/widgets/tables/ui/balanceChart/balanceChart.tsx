'use client';

import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";
import {Operation} from '@/entities/operation';
import {useMemo, useState} from "react";
import styles from './balanceChart.module.css'
import classNames from "classnames";
import {Spin} from "antd";


type Period = 'month' | '3months' | 'year';

type BalanceChartProps = {
    operations: Operation[];
    loading?: boolean
};

const BalanceChart = ({operations, loading}: BalanceChartProps) => {

    const [period, setPeriod] = useState<Period>('month')

    const groupedData = useMemo(() => {
        if (!operations || operations.length === 0) return [];

        const dailyBalanceMap: Record<string, number> = {}
        let balance = 0

        operations.forEach(operation => {
            const date = new Date(operation.date);
            const dateKey = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

            balance += operation.type === 'расход' ? -operation.value : operation.value
            dailyBalanceMap[dateKey] = balance
        })

        return Object.entries(dailyBalanceMap).map(([date, balance]) => ({name: date, balance}));
    }, [operations])


    const filteredData = useMemo(() => {
        const now = new Date();
        let cutoffDate = new Date();

        if (period === 'month') {
            cutoffDate.setMonth(now.getMonth() - 1);
        } else if (period === '3months') {
            cutoffDate.setMonth(now.getMonth() - 3);
        } else if (period === 'year') {
            cutoffDate.setFullYear(now.getFullYear() - 1);
        }

        return groupedData.filter(({name}) => {
            const [day, month, year] = name.split('.').map(Number);
            const entryDate = new Date(year, month - 1, day);
            return entryDate >= cutoffDate;
        });
    }, [groupedData, period]);


    const CustomTooltip = ({active, payload}: any) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    background: 'var(--background)',
                    padding: '5px 10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px'
                }}>
                    <p>{payload[0].payload.name}</p>
                    <p>{payload[0].value}</p>
                </div>
            );
        }
        return null;
    };


    if (loading) {
        return (
            <div className={styles.balanceChart}>
                <div className={styles.loading}>
                    <Spin/>
                </div>
            </div>
        )
    }


    if (!operations || operations.length == 0) return null
    return (
        <div className={styles.balanceChart}>
            <div className={styles.controls}>
                <button className={classNames(styles.control, {[styles.active]: period == 'month'})}
                        onClick={() => setPeriod('month')}>Месяц
                </button>
                <button className={classNames(styles.control, {[styles.active]: period == '3months'})}
                        onClick={() => setPeriod('3months')}>3 месяца
                </button>
                <button className={classNames(styles.control, {[styles.active]: period == 'year'})}
                        onClick={() => setPeriod('year')}>Год
                </button>
            </div>

            <ResponsiveContainer width={"100%"} height={300}>
                <LineChart data={filteredData} stackOffset="wiggle" margin={{top: 20, bottom: 20}}>
                    <XAxis stroke="var(--text)"
                           dataKey="name"
                           interval={'preserveEnd'}
                           tickFormatter={(name) => {
                               const [day, month] = name.split('.').map((num:string) => num.padStart(2, '0'));
                               return `${day}.${month}`;
                           }}

                           angle={-45}
                           textAnchor="end"
                           padding={{left: 30, right: 30}}
                    />
                    <YAxis stroke="var(--text)" domain={['dataMin - 10000', 'dataMax + 10000']}/>
                    <Tooltip content={<CustomTooltip/>}/>
                    <Line type="monotone" dataKey="balance" stroke="var(--accent)" activeDot={{r: 8}}/>
                </LineChart>
            </ResponsiveContainer>

        </div>
    );

};

export default BalanceChart;

