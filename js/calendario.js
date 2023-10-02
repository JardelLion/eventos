const prevMonthButton = document.querySelector('.prev-month');
const nextMonthButton = document.querySelector('.next-month');
const currentMonthDisplay = document.getElementById('current-month');
const calendarBody = document.getElementById('calendar-body');

const weekDaysRow = document.getElementById('weekdays-row')

//pegar a data do sistema
const dataAtual = new Date();
const anoAtual = dataAtual.getFullYear() 
const mesAtual = dataAtual.getMonth();


// Definir a data inicial
let currentDate = new Date(anoAtual, mesAtual); // Janeiro de 2023 (os meses sao baseados em zero)

// Funcao para gerar dinamicamente os dias do mes no corpo do calendario
function generateCalendar() {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    currentMonthDisplay.textContent = new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: 'long' }).format(currentDate);

    let day = new Date(firstDayOfMonth);
    let row = document.createElement('tr');
    
    const today = currentDate.getDate();

    // funcao para obter os nomes dos dias da semana baseados no mes atual

    function getWeekdays(){
        
        const weekdays = [
            'Domingo','Segunda','Terca',
            'Quarta','Quinta','Sexta','Sabado'
        ]
        
        const firstDayOfWeek = firstDayOfMonth.getDay();
        return weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
    }

   
    
    const weekdays = getWeekdays();


    weekDaysRow.innerHTML = '';
    // Preenche os nomes dos dias da semana
    for (const weekday of weekdays){
        const th = document.createElement('th');
        th.textContent = weekday;
        weekDaysRow.appendChild(th);
    }

     // Limpa o conteudo anterior do calendario
     calendarBody.innerHTML = '';
    

    

    while (day <= lastDayOfMonth) {
        const row = document.createElement('tr');
    
        
        for (let i = 0; i < 7; i++) {
            const cell = document.createElement('td');
            cell.style.width = '30px'; /* Largura reduzida das celulas */
            cell.style.height = '60px'; /* Altura das celulas */
            cell.style.position = 'relative'; /* Garante que a posiaoo seja relativa */
            cell.style.margin = '0'; /* Zere as margens para evitar duplicao de espa�amento */
            cell.style.borderRadius = '3px'; /* Arredondamento das bordas */

            const span = document.createElement('span');
            span.textContent = day.getDate();
            span.style.fontSize = '12px';
            span.style.padding = '3px';
            span.style.margin = '0'; /* Zere as margens para evitar duplicao de espa�amento */

            cell.appendChild(span);
            
            
            if (day.getDate() === today && day.getMonth() === currentDate.getMonth()) {
                cell.classList.add('current-day');
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

