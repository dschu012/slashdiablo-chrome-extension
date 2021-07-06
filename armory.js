(($) => {

  if(!location.pathname.startsWith('/character')) return;

  /* Hidden link for saving the char */
  let link = document.createElement('a');
  link.style.display = 'none';
  document.body.appendChild(link);

  function appendPluginHtml() {
    $(".app").removeClass("app");
    let reactRoot = $("div[data-reactroot]");
    let pluginRoot = $(`<div id="plugin-root" class="mdl-layout--fixed-header"></div>`);
    let container = $(`<div id="plugin-inner-contaier-root" class="mdl-layout__inner-container"></div>`);
    let header = $(`<header id="plugin-header-root" class="mdl-layout__header mdl-layout__header--transparent">
      <div class="mdl-layout__header-row mdl-layout--fixed-header">
      <span class="mdl-layout-title"></span>
        <div class="mdl-layout-spacer"></div>
        <nav class="mdl-navigation">
          <button id="save" class="mdl-button mdl-js-button mdl-js-ripple-effect">
            <i class="material-icons">save</i> Save
          </a>
        </nav>
      </div>
    </header>`);
    let content = $(`<main class="mdl-layout__content">
    </main>`);
    $("#root").addClass("app")
      .append(pluginRoot);

    content.append(reactRoot);
    container.append(header, content);
    pluginRoot.append(container);
    componentHandler.upgradeElement(pluginRoot[0], 'MaterialLayout');
  }

  $(document).on('click', '#save', (event) => {
    let buttton = $(event.currentTarget);
    buttton.prop("disabled", true);
    let reactRoot = document.querySelector('div[data-reactroot]');
    let reactProp = Object.getOwnPropertyNames(reactRoot)[0];
    let reactAppInstance = reactRoot[reactProp]._renderedChildren[".0"]._instance;
    $.getJSON(`/api/v1/characters?name=${reactAppInstance.props.params.name}`,  (response) => {
      try {
        d2s.write(response.character.d2s, constants.constants).then((data) => {
          let blob = new Blob([data], { type: "octet/stream" });
          link.href = window.URL.createObjectURL(blob);
          link.download = response.character.d2s.header.name + '.d2s';
          link.click();
          buttton.prop("disabled", false);
        });
      } catch (e) {
        alert(e);
      }
    })
  });

  appendPluginHtml();

})(jQuery);
