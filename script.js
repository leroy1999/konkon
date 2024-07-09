const API_KEY = 'AIzaSyB3yMGC2qS3dC3yo2qc8V1HuRtQNFT3Sso';
const SPREADSHEET_ID = '1p_maMTsTP8TlSgaL-StGnmIFCxrhXpEdM8PSv8tiagk';
const RANGE = 'Sheet1!A2:F';

document.getElementById('generateButton').addEventListener('click', generateMenu);

async function fetchData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error.message);
        }
        return data.values;
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(`データの取得中にエラーが発生しました: ${error.message}`);
        return null;
    }
}

async function generateMenu() {
    const values = await fetchData();
    if (!values) return;

    const meals = {
        staple: values.map(row => row[0]).filter(item => item),
        mainDish: values.map(row => row[1]).filter(item => item),
        sideDish: values.map(row => row[2]).filter(item => item),
        sideDish2: values.map(row => row[3]).filter(item => item),
        soup: values.map(row => row[4]).filter(item => item),
        dessert: values.map(row => row[5]).filter(item => item)
    };

    const result = [];
    const categories = [
        { id: 'staple', name: '主食' },
        { id: 'mainDish', name: '主菜' },
        { id: 'sideDish', name: '副菜' },
        { id: 'sideDish2', name: '副副菜' },
        { id: 'soup', name: '汁物' },
        { id: 'dessert', name: 'デザート' }
    ];

    categories.forEach(category => {
        const checkbox = document.getElementById(category.id);
        if (checkbox.checked) {
            const items = meals[category.id];
            const randomItem = items[Math.floor(Math.random() * items.length)];
            result.push(`${category.name}: ${randomItem}`);
        }
    });

    document.getElementById('result').innerText = result.join('\n');
}