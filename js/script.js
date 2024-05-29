$(document).ready(function() {
    let totalIncome = 0;
    let totalExpense = 0;

    function updateTotals() {
        $('#total-income').text(totalIncome);
        $('#total-expense').text(totalExpense);
    }

    $('#entry-form').on('submit', function(e) {
        e.preventDefault();

        const date = $('#date').val();
        const description = $('#description').val();
        const amount = parseFloat($('#amount').val());
        const type = $('#type').val();

        if (!date || !description || isNaN(amount)) {
            alert("모든 필드를 올바르게 입력하세요.");
            return;
        }

        const entry = `<div class="entry">
            <span>${date}</span>
            <span>${description}</span>
            <span>${amount}</span>
            <span>${type === 'income' ? '수입' : '지출'}</span>
            <button class="delete-entry">삭제</button>
        </div>`;

        $('#entries').append(entry);

        if (type === 'income') {
            totalIncome += amount;
        } else {
            totalExpense += amount;
        }

        console.log("Total Income:", totalIncome);
        console.log("Total Expense:", totalExpense);

        updateTotals();
        $('#entry-form')[0].reset();
    });

    $('#entries').on('click', '.delete-entry', function() {
        const entry = $(this).closest('.entry');
        const amount = parseFloat(entry.find('span:nth-child(3)').text());
        const type = entry.find('span:nth-child(4)').text();

        if (type === '수입') {
            totalIncome -= amount;
        } else {
            totalExpense -= amount;
        }

        entry.remove();
        updateTotals();
    });
});
