(($) => {

  if(!location.pathname.startsWith('/account')) return;

  function appendPluginHtml() {
    let main = $('main');
    let buttons = $(`
      <button style="margin: 10px 10px 0px 0px" class="u-pull-right" id="export">BH Filter Missing Items</button>
    `);
    main.prepend(buttons);
  }

  function lookupCode(code) {
    return window.constants.constants.armor_items[code]
      || window.constants.constants.weapon_items[code]
      || window.constants.constants.other_items[code];
  }

  $(document).on('click', '#export', (event) => {
    let all_uniques = [].concat(...window.constants.constants.unq_items.map((e,i) => { e.i = i; return e; }));
    let all_sets = [].concat(...window.constants.constants.set_items.map((e,i) => { e.i = i; return e; }));

    //quest items and such
    let filtered_uniques = [123,124,125,126,127,128,263];
    all_uniques = all_uniques.filter(value => filtered_uniques.includes(value.i));

    let account = location.pathname.split('/')[2];
    $.getJSON(`/api/v1/items?account=${account}`, (response) => {
      console.log(response);
      for(let item of response) {
        //set
        if(item.data.quality === 5) {
          all_sets = all_sets.filter(value => value.i !== item.data.set_id);
        }
        //unq
        if(item.data.quality === 7) {
          all_uniques = all_uniques.filter(value => value.i !== item.data.unique_id);
        }
      }
      let lines = [`//MISSING GRAIL SETS - ${all_sets.length}`];
      for(let set of all_sets) {
        if(!set.c) continue;
        lines.push(`ItemDisplay[SET (!ID ${set.c})]: %PURPLE%Grail o %GOLD%%NAME%%BORDER-00%%MAP-0C%\t\t\t\t\t\t//${set.n} - ${lookupCode(set.c).n}`);
      }
      lines.push(`//MISSING GRAIL UNIQUES - ${all_uniques.length}`)
      for(let unq of all_uniques) {
        if(!unq.c) continue;
        lines.push(`ItemDisplay[UNI (!ID ${unq.c})]: %PURPLE%Grail o %GOLD%%NAME%%BORDER-00%%MAP-0C%\t\t\t\t\t\t//${unq.n} - ${lookupCode(unq.c).n}`);
      }
      navigator.clipboard.writeText(lines.join('\n'))
      .then(() => {
        alert("BH Filter was copied to clipboard. Paste it at the beginning of your UNIQUES AND SETS filter section.");
      })
    });

  });

  appendPluginHtml();

})(jQuery);
