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
    let filtered_uniques = [29,123,124,125,126,127,128,263,346];
    all_uniques = all_uniques.filter(value => !filtered_uniques.includes(value.i));

    all_sets = all_sets.filter(value => !!value.c);
    all_uniques = all_uniques.filter(value => !!value.c);

    let account = location.pathname.split('/')[2];
    $.getJSON(`/api/v1/items?account=${account}`, (response) => {
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
        lines.push(`ItemDisplay[SET (!ID ${set.c})]: __SET_STYLE__\t\t\t\t\t\t//${set.n} - ${lookupCode(set.c).n}`);
      }
      lines.push(`//MISSING GRAIL UNIQUES - ${all_uniques.length}`)
      for(let unq of all_uniques) {
        if(!unq.c) continue;
        lines.push(`ItemDisplay[UNI (!ID ${unq.c})]: __UNIQUE_STYLE__\t\t\t\t\t\t//${unq.n} - ${lookupCode(unq.c).n}`);
      }

      document.dispatchEvent(new CustomEvent('copy-item-filter-clipboard', { detail: { lines: lines }}));
    });

  });

  appendPluginHtml();

})(jQuery);
