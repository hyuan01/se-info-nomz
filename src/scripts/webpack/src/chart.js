import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
} from 'chart.js';

Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
);

import {displayBias} from './analysis';

//alert(bias);
function drawChart(bias){
    let myChart = document.getElementById('myChart').getContext('2d');
    let doughnutChart = new Chart(myChart, {
    type:'doughnut',
    data: {
        labels:['Left', 'Left-Leaning', 'Center', 'Right-Leaning', 'Right'],
        datasets:[{
        label: 'Media Bias',
        data: [
            bias[0],
            bias[1],
            bias[2],
            bias[3],
            bias[4]
        ],
        backgroundColor: [
            '#8093e2',
            '#9580f0',
            '#e57682',
            '#e35ba3',
            '#e53c51'
        ]
        }]
    },
        options:{}
    });
}

// slider to adjust the time frame of analysis
var slider = document.getElementById("days_slider");
var output = document.getElementById("slider_value");
output.innerHTML = slider.value;

var time_frame = slider.value; 
drawChart(displayBias(7)); // draws a chart with the default time_frame of 7 days


slider.oninput = function() {
    output.innerHTML = this.value;
    const current_chart = Chart.getChart("myChart");
    current_chart.data.datasets[0].data = displayBias(this.value);
    current_chart.update();
    
    var bias = displayBias(slider.value);

    var article_sum = 0;
    for (let i = 0; i < bias.length; i++) {
        article_sum = article_sum + bias[i];
    }
    var aggr = 0;
    for (let i = 0; i < bias.length; i++) {
        aggr = aggr + bias[i]*(i+1);
        //alert(aggr);
    }
    aggr = aggr/article_sum;
    //alert(aggr);
    document.getElementById('callout_info').innerHTML = "You've read " + article_sum + " political articles.";

    if (article_sum == 0){
        document.getElementById('callout_political').innerHTML = "You've read no articles."
    }
    else if(1 < aggr && aggr < 1.8){
        document.getElementById('callout_political').innerHTML = "You tend to read politically left articles."
    }
    else if(aggr < 2.6){
        document.getElementById('callout_political').innerHTML = "You tend to read left-leaning political articles."
    }
    else if(aggr < 3.4){
        document.getElementById('callout_political').innerHTML = "You tend to read politically neutral articles."
    }
    else if(aggr < 4.2){
        document.getElementById('callout_political').innerHTML = "You tend to read right-leaning political articles."
    }
    else{
        document.getElementById('callout_political').innerHTML = "You tend to read politically right articles."
    }

    document.getElementById('callout_topical').innerHTML = "Your most frequent topic is ____.";

    // current_chart.destroy();
    // drawChart(displayBias(time_frame));
} // Display the default slider value