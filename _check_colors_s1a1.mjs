// Check what cpfair annotations exist for 1:1 in the existing app's data source
// and compare with what colors the app would apply.
// The user says "letter 10 should be blue" referring to position 9 (second lam of Allah).

const tajweeedRules = {
  madd_muttasil: '#D32F2F',
  idghaam_ghunnah: '#388E3C',
  idghaam_no_ghunnah: '#E65100',
  idghaam_shafawi: '#388E3C',
  idghaam_mutajanisayn: '#388E3C',
  idghaam_mutaqaribayn: '#388E3C',
  ikhfa: '#1565C0',
  ikhfa_shafawi: '#1565C0',
  iqlab: '#E91E63',
  lam_shamsiyyah: '#757575',
  qalqalah: '#F9A825',
  madd_2: '#D32F2F',
  madd_246: '#D32F2F',
  madd_munfasil: '#D32F2F',
  madd_6: '#D32F2F',
  ghunnah: '#388E3C',
  silent: '#757575',
  hamzat_wasl: '#7B1FA2'
};

// Check what rule would cover the lam-shadda-fatha sequence at positions 9-11
// The lam of "الله" carries shadda - this is NOT a tajweed rule annotation in cpfair
// but it IS emphasized pronunciation

async function main() {
  const res = await fetch('https://raw.githubusercontent.com/nuqayah/quran-text/master/quran-uthmani.txt');
  const lines = (await res.text()).split('\n').filter(l => l.trim());
  const t = lines[0]; // 1:1

  console.log('Text:', JSON.stringify(t));
  console.log('Length:', t.length);

  // Check what color each character position would get from the current cpfair annotations
  const tajRes = await fetch('https://raw.githubusercontent.com/cpfair/quran-tajweed/master/output/tajweed.hafs.uthmani-pause-sajdah.json');
  const cpfair = await tajRes.json();
  const entry = cpfair.find(e => e.surah === 1 && e.ayah === 1);
  const anns = entry?.annotations || [];

  console.log('\nAnnotations:');
  for (const a of anns) {
    console.log(`  [${a.start},${a.end}) ${a.rule}: "${t.substring(a.start, a.end)}" → ${tajweeedRules[a.rule]}`);
  }

  // Show char-by-char color assignment
  console.log('\nChar-by-char colors:');
  for (let i = 0; i < t.length; i++) {
    let color = '#000000'; // default black
    for (const a of anns) {
      if (i >= a.start && i < a.end) {
        color = tajweeedRules[a.rule] || '#000000';
        break;
      }
    }
    const marker = color === '#000000' ? ' ' : '✓';
    console.log(`  [${i}] ${t[i]} U+${t.charCodeAt(i).toString(16).padStart(4, '0')} ${marker} ${color}`);
  }
}

main().catch(console.error);
