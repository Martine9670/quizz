const fs = require('fs');

async function exportQuestions() {
  let allQuestions = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(`http://localhost:1337/api/questions?pagination[page]=${page}&pagination[pageSize]=100`);
    const data = await res.json();
    
    allQuestions = [...allQuestions, ...data.data];
    console.log(`Page ${page} - ${allQuestions.length}/${data.meta.pagination.total} questions`);
    
    hasMore = allQuestions.length < data.meta.pagination.total;
    page++;
  }

  fs.writeFileSync('questions_export.json', JSON.stringify(allQuestions, null, 2));
  console.log(`✅ Export terminé : ${allQuestions.length} questions`);
}

exportQuestions().catch(console.error);
