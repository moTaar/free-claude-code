async function main() {
  const res = await fetch('https://raw.githubusercontent.com/nuqayah/quran-text/master/quran-uthmani.txt');
  const lines = (await res.text()).split('\n').filter(l => l.trim());
  const tajRes = await fetch('https://raw.githubusercontent.com/cpfair/quran-tajweed/master/output/tajweed.hafs.uthmani-pause-sajdah.json');
  const cpfair = await tajRes.json();

  const entry = cpfair.find(e => e.surah === 1 && e.ayah === 1);
  const t = lines[0]; // 1:1 is line 0

  if (!entry) { console.log('No cpfair entry for 1:1'); return; }
  if (!entry.annotations) { console.log('No annotations for 1:1'); return; }

  console.log('Text:', JSON.stringify(t));
  console.log('Annotations:');
  for (const a of entry.annotations) {
    const snippet = t.substring(a.start, a.end);
    console.log(`  [${a.start},${a.end}) rule=${a.rule} "${snippet}"`);
  }

  // Check what color letter 10 would get
  console.log('\nLetter 10 char:', JSON.stringify(t[10]), 'U+'+t.charCodeAt(10).toString(16).padStart(4, '0'));
}
main();
