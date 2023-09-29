const prevMonthButton = document.querySelector('.prev-month');
const nextMonthButton = document.querySelector('.next-month');
const currentMonthDisplay = document.getElementById('current-month');
const calendarBody = document.getElementById('calendar-body');

// Definir a data inicial
let currentDate = new Date(2023, 0); // Janeiro de 2023 (os meses sao baseados em zero)

// Funcao para gerar dinamicamente os dias do mes no corpo do calendario
function generateCalendar() {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    currentMonthDisplay.textContent = new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: 'long' }).format(currentDate);

    let day = new Date(firstDayOfMonth);

    // Limpa o conteudo anterior do calendario
    calendarBody.innerHTML = '';

    while (day <= lastDayOfMonth) {
        const row = document.createElement('tr');

        for (let i = 0; i < 7; i++) {
            const cell = document.createElement('td');
            cell.textContent = day.getDate();

            // Destaque o dia atual
            if (day.toDateString() === new Date().toDateString()) {
                cell.classList.add('current-day');
            }

		
		// Estiliza todos os dias do mes atual com a cor cinza
            if (day.getMonth() === currentDate.getMonth()) {
                cell.style.backgroundColor = '#d9d9d9';
            }
            else {
                cell.style.backgroundColor = '#f0f0f0';
            }


// Estiliza o dia atual com a cor verde
            if (day.toDateString() === currentDate.toDateString()) {
                cell.classList.add('current-day');
                cell.style.color = 'green'; // Define a cor verde
            }

            row.appendChild(cell);
            day.setDate(day.getDate() + 1);
        }

        calendarBody.appendChild(row);
    }

    // Adicionar evento de clique para o dia 1 do proximo mes
    if (currentDate.getMonth() === 11) { // Se for dezembro, avance o ano
        const nextMonth = new Date(currentDate.getFullYear() + 1, 0);
        if (day.getDate() === 1) {
            day.setDate(2); // Para evitar loop infinito, defina para o dia 2
        }
        if (day.toDateString() === nextMonth.toDateString()) {
            day.setDate(1); // Se for o dia 1 do proximo mes, defina-o para o dia 1 do mes atual
        }
    } else {
        const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
        if (day.getDate() === 1) {
            day.setDate(2); // Para evitar loop infinito, defina para o dia 2
        }
        if (day.toDateString() === nextMonth.toDateString()) {
            day.setDate(1); // Se for o dia 1 do proximo mes, defina-o para o dia 1 do mes atual
        }
    }

    document.querySelectorAll('td').forEach((cell) => {
        cell.addEventListener('click', () => {
            if (cell.textContent === '1') {
                currentDate.setMonth(currentDate.getMonth() + 1);
                generateCalendar();
            }
        });
    });
}

// Logica para navegar para o mes anterior
prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar();
});

// Logica para navegar para o proximo mes
nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar();
});

// Inicialize o calendario
generateCalendar();

