var input = document.getElementById("tickerVal");
var chartData = [];
let tableData = [];
var historychartDataMin = [];
var historychartDataMax = [];
var labelhistorychartData = [];

input.addEventListener("keyup", function(event) {
if (event.keyCode === 13) {
    event.preventDefault();
    console.log('### Search for ticker: ' + input.value);
    chartData = [];

    $.ajax({
        type: 'get',
        url: '/ticker/' + input.value + '/mm10',
        success: function (data1) {
            // use data for single returned value from mm10
            /* data1 = data1.substring(24);
            console.log("### yahoo returned value is: " + data1);
            chartData.push(parseFloat(data1));
            renderChart(chartData);
            */

            // use data for array returned value from mm10
            console.log("#### TenValue elements: " + JSON.stringify(data1));
            tableData = data1;
            let sum = 0;
            let stringifiedTenValue = JSON.stringify(data1[0]);
            let parsedelement = data1[0];
            let endValue = parsedelement[0];
            console.log("#### First stringified value: " + JSON.stringify(data1[0]));
            console.log("#### First stringified value: " + JSON.stringify(endValue.close));
            let table = document.getElementById("dataTable");
            
            for (var x = 0; x < data1.length; x++) {
                let dataElement = data1[x];
                console.log("#### dataElement: " + JSON.stringify(dataElement));
                sum += dataElement[0].close;
                
                // Fill table data
                var row = table.insertRow(x + 1);
                var coldate = row.insertCell(0);
                var colopen = row.insertCell(1);
                var colclose = row.insertCell(2);
                var colhigh = row.insertCell(3);
                var collow = row.insertCell(4);
                coldate.innerHTML = dataElement[0].date.substring(0,10);
                colopen.innerHTML = dataElement[0].open;
                colclose.innerHTML = dataElement[0].close;
                colhigh.innerHTML = dataElement[0].high;
                collow.innerHTML = dataElement[0].low;

                // Fill historyChartData array
                labelhistorychartData.push((dataElement[0].date).substring(0,10));
                historychartDataMin.push(parseFloat(dataElement[0].low));
                historychartDataMax.push(parseFloat(dataElement[0].high))
            };
            console.log("### yahoo returned value is: " + sum);
            let chartValuemm10 = sum/10;
            chartData.push(parseFloat(chartValuemm10));
            renderChart(chartData);
            renderHistoryChart(historychartDataMin,historychartDataMax);

        }
    })

    $.ajax({
        type: 'get',
        url: '/ticker/' + input.value + '/value',
        success: function (data) {
            // use data
            data = data.substring(20);
            console.log("### yahoo returned value is: " + data);
            chartData.push(parseFloat(data));
            renderChart(chartData);
        }
    })
    
    }
});

// Graphs
function renderChart (chartData) {
    var ctx = document.getElementById("myChartmm");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Value", "MM10"],
            datasets: [{
                data: chartData,
                lineTension: 0,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 4,
                pointBackgroundColor: '#007bff'
            }]
        },
        options: {
            scales: {
            yAxes: [{
                ticks: {
                beginAtZero: true
                }
            }]
            },
            legend: {
            display: false,
            }
        }
    });
    myChart.update();
}

// Graphs historical
function renderHistoryChart (historychartDataMin, historyChartDataMax) {
    var ctx = document.getElementById('myCharthistory');
    var myhistoryChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labelhistorychartData,
            datasets: [{
                label: 'Min Value',
                data: historychartDataMin,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: 'Max Values',
                data: historychartDataMax,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    stacked: false,
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    myhistoryChart.update();
}
