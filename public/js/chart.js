// window.onload = function () {

//     var chart = new CanvasJS.Chart("chartContainer", {
//         animationEnabled: true,  
//         // title:{
//         //     text: "Biểu Đồ Dòng Điện",
//         //     fontSize: 20, // Set the font size for the title,
//         //     fontFamily: 'Be Vietnam Pro, sans-serif' // Set the font family for the title
//         // },
//         axisY: {
//             title: "Units Sold",
//             valueFormatString: "#0,,.",
//             suffix: "mn",
//             stripLines: [{
//                 value: 3366500,
//                 label: "Average"
//             }]
//         },
//         data: [{
//             yValueFormatString: "#,### Units",
//             xValueFormatString: "YYYY",
//             type: "spline",
//             dataPoints: [
//                 {x: new Date(2002, 0), y: 2506000},
//                 {x: new Date(2003, 0), y: 2798000},
//                 {x: new Date(2004, 0), y: 3386000},
//                 {x: new Date(2005, 0), y: 6944000},
//                 {x: new Date(2006, 0), y: 6026000},
//                 {x: new Date(2007, 0), y: 2394000},
//                 {x: new Date(2008, 0), y: 1872000},
//                 {x: new Date(2009, 0), y: 2140000},
//                 {x: new Date(2010, 0), y: 7289000},
//                 {x: new Date(2011, 0), y: 4830000},
//                 {x: new Date(2012, 0), y: 2009000},
//                 {x: new Date(2013, 0), y: 2840000},
//                 {x: new Date(2014, 0), y: 2396000},
//                 {x: new Date(2015, 0), y: 1613000},
//                 {x: new Date(2016, 0), y: 2821000},
//                 {x: new Date(2017, 0), y: 2000000}
//             ]
//         }]
//     });
//     chart.render();
    
//     }


window.onload = function () {

    var dps = [];
    var chart = new CanvasJS.Chart("chartContainer", {
        exportEnabled: true,
        // title :{
        //     text: "Dynamic Spline Chart"
        // },
        data: [{
            type: "spline",
            markerSize: 0,
            dataPoints: dps 
        }]
    });
    
    var xVal = dataArr[0];
    var yVal = 20;
    var updateInterval = 1000;
    var dataLength = 50; // number of dataPoints visible at any point
    
    var updateChart = function (count) {
        count = count || 1;
        // count is number of times loop runs to generate random dataPoints.
        for (var j = 0; j < count; j++) {	
            yVal = yVal + Math.round(1 + Math.random() *(-1-1));
            dps.push({
                x: xVal,
                y: yVal
            });
            xVal++;
        }
        if (dps.length > dataLength) {
            dps.shift();
        }
        chart.render();
    };
    
    updateChart(dataLength); 
    setInterval(function(){ updateChart() }, updateInterval); 
    
    }