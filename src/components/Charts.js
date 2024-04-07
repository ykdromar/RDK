import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const lineOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

export const LineGraph = (props) => {
  return <Line {...props} />;
};

export const DoughnutGraph = (props) => {
  return <Doughnut {...props} />;
};

export const VerticalBarGraph = (props) => {
  return <Bar {...props} />;
};

export const HorizontalBarGraph = (props) => {
  return <Bar {...props} />;
};
