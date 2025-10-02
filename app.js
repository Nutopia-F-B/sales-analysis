// Sales data
const salesData = {
    totalSales: {
        fouad: 1073098,
        somuha: 1727544
    },
    monthlySales: {
        months: ['يوليو', 'أغسطس', 'سبتمبر'],
        fouad: [353694, 371967, 347437],
        somuha: [578291, 581045, 568208]
    },
    serviceBreakdown: {
        fouad: { delivery: 343491, takeaway: 729607 },
        somuha: { delivery: 952572, takeaway: 774972 }
    },
    topCategories: {
        fouad: {
            categories: ['Offer', 'JARS', 'MOLTEN', 'WAFFLE & Crepe', 'Menu el Faka', 'Cakes', 'Mini Cake', 'Iced Coffee'],
            sales: [213230, 199223, 112454, 70030, 68332, 58938, 46963, 37699]
        },
        somuha: {
            categories: ['JARS', 'Offer', 'MOLTEN', 'WAFFLE & Crepe', 'Mini Cake', 'Cakes', 'Menu el Faka', 'Coffee'],
            sales: [343352, 274373, 200279, 170925, 97535, 92560, 75782, 49269]
        }
    },
    keyProducts: {
        products: ['Dessert + Coffee', 'Nutella Molten Cake', 'Nutella Magic Jar', 'Nutella Magic Jar XL'],
        fouad: [160996, 84582, 72062, 42241],
        somuha: [160667, 156667, 145906, 63758]
    },
    seasonalChanges: {
        categories: ['Menu el Faka', 'JARS', 'MOLTEN', 'Mini Cake', 'Offer', 'Cakes', 'WAFFLE & Crepe', 'Milk Shake'],
        changes: [14199, 12283, 6406, 6275, -23300, -13365, -12324, -3567]
    }
};

// Chart colors from design system
const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// Format number with commas for Arabic locale
function formatNumber(num) {
    return new Intl.NumberFormat('ar-EG').format(num);
}

// Initialize all charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTotalSalesChart();
    initializeMonthlyTrendChart();
    initializeServiceBreakdownChart();
    initializeCategoriesChart();
    initializeKeyProductsChart();
    initializeSeasonalChangesChart();
});

// 1. Total Sales Comparison Chart
function initializeTotalSalesChart() {
    const ctx = document.getElementById('totalSalesChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['فرع فؤاد', 'فرع سموحة'],
            datasets: [{
                label: 'إجمالي المبيعات (جنيه)',
                data: [salesData.totalSales.fouad, salesData.totalSales.somuha],
                backgroundColor: [chartColors[2], chartColors[0]],
                borderColor: [chartColors[2], chartColors[0]],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `المبيعات: ${formatNumber(context.raw)} جنيه`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatNumber(value);
                        }
                    },
                    title: {
                        display: true,
                        text: 'المبيعات (جنيه)'
                    }
                }
            },
            elements: {
                bar: {
                    borderSkipped: false
                }
            }
        }
    });
}

// 2. Monthly Trend Chart
function initializeMonthlyTrendChart() {
    const ctx = document.getElementById('monthlyTrendChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: salesData.monthlySales.months,
            datasets: [
                {
                    label: 'فرع فؤاد',
                    data: salesData.monthlySales.fouad,
                    borderColor: chartColors[2],
                    backgroundColor: chartColors[2] + '20',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointHoverRadius: 8
                },
                {
                    label: 'فرع سموحة',
                    data: salesData.monthlySales.somuha,
                    borderColor: chartColors[0],
                    backgroundColor: chartColors[0] + '20',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${formatNumber(context.raw)} جنيه`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatNumber(value);
                        }
                    },
                    title: {
                        display: true,
                        text: 'المبيعات (جنيه)'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// 3. Service Breakdown Chart
function initializeServiceBreakdownChart() {
    const ctx = document.getElementById('serviceBreakdownChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['فؤاد - دليفري', 'فؤاد - تيك أواي', 'سموحة - دليفري', 'سموحة - تيك أواي'],
            datasets: [{
                data: [
                    salesData.serviceBreakdown.fouad.delivery,
                    salesData.serviceBreakdown.fouad.takeaway,
                    salesData.serviceBreakdown.somuha.delivery,
                    salesData.serviceBreakdown.somuha.takeaway
                ],
                backgroundColor: [chartColors[2], chartColors[6], chartColors[0], chartColors[1]],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.raw / total) * 100).toFixed(1);
                            return `${context.label}: ${formatNumber(context.raw)} جنيه (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// 4. Categories Comparison Chart
function initializeCategoriesChart() {
    const ctx = document.getElementById('categoriesChart').getContext('2d');
    
    // Get top 6 categories from each branch for better visibility
    const topFouadCategories = salesData.topCategories.fouad.categories.slice(0, 6);
    const topFouadSales = salesData.topCategories.fouad.sales.slice(0, 6);
    const topSomuhaCategories = salesData.topCategories.somuha.categories.slice(0, 6);
    const topSomuhaSales = salesData.topCategories.somuha.sales.slice(0, 6);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topFouadCategories,
            datasets: [
                {
                    label: 'فرع فؤاد',
                    data: topFouadSales,
                    backgroundColor: chartColors[2],
                    borderRadius: 6
                },
                {
                    label: 'فرع سموحة',
                    data: topSomuhaCategories.map(cat => {
                        const index = salesData.topCategories.somuha.categories.indexOf(cat);
                        return index >= 0 ? salesData.topCategories.somuha.sales[index] : 0;
                    }),
                    backgroundColor: chartColors[0],
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${formatNumber(context.raw)} جنيه`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatNumber(value);
                        }
                    },
                    title: {
                        display: true,
                        text: 'المبيعات (جنيه)'
                    }
                },
                y: {
                    ticks: {
                        maxRotation: 0
                    }
                }
            }
        }
    });
}

// 5. Key Products Chart
function initializeKeyProductsChart() {
    const ctx = document.getElementById('keyProductsChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: salesData.keyProducts.products,
            datasets: [
                {
                    label: 'فرع فؤاد',
                    data: salesData.keyProducts.fouad,
                    backgroundColor: chartColors[2],
                    borderRadius: 6
                },
                {
                    label: 'فرع سموحة',
                    data: salesData.keyProducts.somuha,
                    backgroundColor: chartColors[0],
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${formatNumber(context.raw)} جنيه`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatNumber(value);
                        }
                    },
                    title: {
                        display: true,
                        text: 'المبيعات (جنيه)'
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45
                    }
                }
            }
        }
    });
}

// 6. Seasonal Changes Chart
function initializeSeasonalChangesChart() {
    const ctx = document.getElementById('seasonalChangesChart').getContext('2d');
    
    // Separate positive and negative changes for different colors
    const colors = salesData.seasonalChanges.changes.map(change => 
        change >= 0 ? chartColors[0] : chartColors[2]
    );
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: salesData.seasonalChanges.categories,
            datasets: [{
                label: 'التغيير في المبيعات (جنيه)',
                data: salesData.seasonalChanges.changes,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const sign = value >= 0 ? '+' : '';
                            return `التغيير: ${sign}${formatNumber(value)} جنيه`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            const sign = value >= 0 ? '+' : '';
                            return sign + formatNumber(value);
                        }
                    },
                    title: {
                        display: true,
                        text: 'التغيير في المبيعات (جنيه)'
                    }
                },
                y: {
                    ticks: {
                        maxRotation: 0
                    }
                }
            }
        }
    });
}

// Add interactive hover effects for tables
document.addEventListener('DOMContentLoaded', function() {
    const tables = document.querySelectorAll('.products-table tbody tr');
    
    tables.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Add click-to-highlight functionality for chart containers
document.addEventListener('DOMContentLoaded', function() {
    const chartContainers = document.querySelectorAll('.chart-container');
    
    chartContainers.forEach(container => {
        container.addEventListener('click', function() {
            // Remove highlight from other containers
            chartContainers.forEach(c => c.classList.remove('highlighted'));
            
            // Add highlight to clicked container
            this.classList.add('highlighted');
            
            // Remove highlight after 3 seconds
            setTimeout(() => {
                this.classList.remove('highlighted');
            }, 3000);
        });
    });
});

// Add CSS for highlighted state
const style = document.createElement('style');
style.textContent = `
    .chart-container.highlighted {
        border: 2px solid var(--color-teal-500);
        box-shadow: 0 0 20px rgba(31, 184, 205, 0.3);
    }
`;
document.head.appendChild(style);