// JSON 파일을 가져와서 테이블로 변환하는 함수
function fetchJsonAndCreateTable(jsonFilePath) {
    fetch(jsonFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('네트워크 응답에 문제가 있습니다.');
            }
            return response.json();
        })
        .then(data => {
            createTable(data);
        })
        .catch(error => {
            console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
        });
}

// JSON 데이터로 테이블을 생성하는 함수
function createTable(data) {
    if (!Array.isArray(data)) {
        console.error('데이터가 배열 형식이 아닙니다.');
        return;
    }

    const table = document.createElement('table');
    table.border = '1px';
    table.style.borderCollapse = 'collapse';

    // 테이블 헤더 생성
    if (data.length > 0) {
        const headerRow = document.createElement('tr');
        const headers = Object.keys(data[0]);

        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            th.style.padding = '10px';
            headerRow.appendChild(th);
        });

        table.appendChild(headerRow);
    }

    // 테이블 데이터 행 생성
    data.forEach(item => {
        const row = document.createElement('tr');

        // 객체의 키와 값을 순회
        Object.keys(item).forEach((key, index) => {
            const td = document.createElement('td');
            td.style.padding = '10px';

            // 두 번째 컬럼(인덱스 1)인 경우 a 태그로 생성
            if (index === 1) {
                const link = document.createElement('a');
                link.href = item[key]; // 값을 URL로 사용
                link.textContent = item[key]; // 링크 텍스트도 URL로 표시
                link.target = "_blank"; // 새 탭에서 열기 (필요에 따라 설정)
                td.appendChild(link);
            } else {
                td.textContent = item[key];
            }

            row.appendChild(td);
        });

        table.appendChild(row);
    });

    // 기존 테이블이 있으면 제거
    const container = document.getElementById('tableContainer');
    if (container) {
        container.innerHTML = '';
        container.appendChild(table);
    } else {
        // 컨테이너가 없으면 body에 직접 추가
        document.body.appendChild(table);
    }
}

// 사용 예시
// fetchJsonAndCreateTable('경로/파일명.json');