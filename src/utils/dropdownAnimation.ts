/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export function dropdownAnimation() {
  // Função para modificar o comportamento do select do Webflow
  function modifyWebflowSelect() {
    // Seleciona o elemento select e a lista de opções
    const select = document.querySelector('select[fs-cmsfilter-field="tipo"]');
    const dropdownList = document.querySelector('.fs-select_list');

    if (!select || !dropdownList) return;

    // Função para atualizar a lista de opções
    function updateDropdownList() {
      const selectedValue = select.value;
      const options = dropdownList.querySelectorAll('.fs-select_link');

      options.forEach((option) => {
        if (option.textContent === selectedValue) {
          option.style.display = 'none';
        } else {
          option.style.display = '';
        }
      });
    }

    // Atualiza a lista inicialmente
    updateDropdownList();

    // Adiciona um event listener para o evento de mudança no select
    select.addEventListener('change', updateDropdownList);

    // Adiciona um event listener para quando o dropdown é aberto
    const dropdownToggle = document.querySelector('.fs-select_toggle');
    if (dropdownToggle) {
      dropdownToggle.addEventListener('click', () => {
        // Pequeno atraso para garantir que o dropdown foi aberto
        setTimeout(updateDropdownList, 0);
      });
    }
  }

  // Executa a função quando o DOM estiver completamente carregado
  document.addEventListener('DOMContentLoaded', modifyWebflowSelect);
}
