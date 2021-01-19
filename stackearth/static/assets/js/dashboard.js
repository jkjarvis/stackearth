(function ($) {
  'use strict';

// flot chart hospital patient total
    if ($("#employeeDepartment").length) {
      var ctx = document.getElementById('employeeDepartment').getContext("2d");

      var employeeDepartmentData = {
        datasets: [{
          data: [10, 30, 40, 20],
          backgroundColor: [
            "#00cff4",
            "#5e6eed",
            "#ff0d59",
            "#00d284"
          ],
          hoverBackgroundColor: [
            "#00cff4",
            "#5e6eed",
            "#ff0d59",
            "#00d284"
          ],
          borderColor: [
            "#00cff4",
            "#5e6eed",
            "#ff0d59",
            "#00d284"
          ],
          legendColor: [
            "#00cff4",
            "#5e6eed",
            "#ff0d59",
            "#00d284"
          ]
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Developer',
          'Designer',
          'Sales',
          'Tester'
        ]
      };
      var employeeDepartmentOptions = {
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true
        },
        legend: false,
        legendCallback: function (chart) {
          var text = [];
          text.push('<ul class="m-auto pl-0 w-100">');
          for (var i = 0; i < employeeDepartmentData.datasets[0].data.length; i++) {
            text.push('<li class="mb-1"><div><span class="legend-dots" style="background:' +
            employeeDepartmentData.datasets[0].legendColor[i] +
              '"></span>');
            if (employeeDepartmentData.labels[i]) {
              text.push(employeeDepartmentData.labels[i]);
            }
            text.push('</div></li>');
          }
          text.push('</ul>');
          return text.join('');
        }
      };
      var employeeDepartmentCanvas = $("#employeeDepartment").get(0).getContext("2d");
      var employeeDepartment = new Chart(employeeDepartmentCanvas, {
        type: 'doughnut',
        data: employeeDepartmentData,
        options: employeeDepartmentOptions
      });
      $("#employeeDepartment-legend3").html(employeeDepartment.generateLegend());
    }
    var totalSalaryData = {
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [{
        label: '# of Votes',
        data: [76, 65, 24, 65, 89, 122, 146],
        backgroundColor: [
          '#5e6eed',
          '#5e6eed',
          '#5e6eed',
          '#5e6eed',
          '#5e6eed',
          '#5e6eed',
          '#5e6eed',
        ],
        borderColor: [
          '#5e6eed',
          '#5e6eed',
          '#5e6eed',
          '#5e6eed',
          '#5e6eed',
          '#5e6eed',
          '#5e6eed',
        ],
        borderWidth: 1,
        fill: false
      }]
    };

    var totalSalaryOptions = {
      scales: {
        yAxes: [{
          ticks: {
            display: false,
            min: 0
          },
          gridLines: {
            display: false
          },
          beginAtZero: true
        }],
        xAxes: [{
          barPercentage: 0.3,
          gridLines: {
            drawBorder: false,
            color: "rgba(169, 169, 169, .32)" 
          }
        }]
      },
      legend: {
        display: false
      },
      elements: {
        point: {
          radius: 0
        }
      }

    };

    if ($("#totalSalary").length) {
      var totalSalaryCanvas = $("#totalSalary").get(0).getContext("2d");
      // This will get the first returned node in the jQuery collection.
      var totalSalary = new Chart(totalSalaryCanvas, {
        type: 'bar',
        data: totalSalaryData,
        options: totalSalaryOptions
      });
    }
    $(".close-hr-banner").on("click", function() {
      $('.hr-banner').hide();
    });

})(jQuery);
