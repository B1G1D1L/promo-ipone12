document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const getData = (url, callback) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();

    request.addEventListener('readystatechange', () => {
      if (request.readyState !== 4) return;
      if (request.status === 200) {
        callback(JSON.parse(request.response));
      } else {
        console.error(new Error('Ошибка: ', request.status));
      }
    })
  }

  

  const tabs = () => {
    const cardDetailChange = document.querySelectorAll('.card-detail__change');
    const cardDetailsTitleElem = document.querySelector('.card-details__title');
    const cardImageItem = document.querySelector('.card__image_item');
    const cardDetailsPrice = document.querySelector('.card-details__price');
    const descriptionMemory = document.querySelector('.description__memory');

  const data = [
    {
      name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
      img: 'img/iPhone-graphite.png',
      price: 95999,
      memory: 128
    },

    {
      name: 'Смартфон Apple iPhone 12 Pro 528GB Silver',
      img: 'img/iPhone-silver.png',
      price: 122455,
      memory: 528
    },

    {
      name: 'Смартфон Apple iPhone 12 Pro 128GB Pacific Blue',
      img: 'img/iPhone-blue.png',
      price:  98345,
      memory: 128
    }
  ];

  const deactive = () => {
    cardDetailChange.forEach(item => item.classList.remove('active'));
  };

  cardDetailChange.forEach((item, i) => {
    item.addEventListener('click', () => {
      if (!item.classList.contains('active')) {
        deactive();
        item.classList.add('active');

        cardDetailsTitleElem.textContent = data[i].name;
        cardImageItem.src = data[i].img;
        cardImageItem.alt = data[i].name;
        cardDetailsPrice.textContent = data[i].price + '₽';
        descriptionMemory.textContent = `Встроенная память (ROM) ${data[i].memory} ГБ`;
      } 
    })
  });
  };

  const accordion = () => {
    const characteristicsList = document.querySelector('.characteristics__list');
    const characteristicsItem = document.querySelectorAll('.characteristics__item');

    characteristicsItem.forEach(item => {
      if (item.children[1].classList.contains('active')) {
        item.children[1].style.height = `${item.children[1].scrollHeight}px`;
      }
    })

    const open = (button, dropDown) => {
      closeAllDrops(button, dropDown);
      dropDown.style.height = `${dropDown.scrollHeight}px`;
      button.classList.add('active');
      dropDown.classList.add('active');
    };
    
    const close = (button, dropDown) => {
      button.classList.remove('active');
      dropDown.classList.remove('active');
      dropDown.style.height = '';
    };
    
    const closeAllDrops = (button, dropDown) => {
      characteristicsItem.forEach(item => {
        if (item.children[0] !== button && item[1] !== dropDown) {
          close(item.children[0], item.children[1])
        } 
      })
    };

    characteristicsList.addEventListener('click', (event) => {
      const target = event.target;
      const parens = target.closest('.characteristics__item');
      const dropDown = parens.querySelector('.characteristics__description'); 

      dropDown.classList.contains('active') ? close(target, dropDown) : open(target, dropDown);
    })  
  };

  const modal = () => {
    const cardDetailsButtonBuy = document.querySelector('.card-details__button_buy');
    const modal = document.querySelector('.modal');
    const cardDetailsButtonDelivery = document.querySelector('.card-details__button_delivery');
    const cardDetailsTitle = document.querySelector('.card-details__title');
    const modalTitle = document.querySelector('.modal__title');
    const modalSubtitle = document.querySelector('.modal__subtitle');

    const openModal = (event) => {
      const target = event.target;

      modal.classList.add('open');
      document.addEventListener('keydown', escapeHandler);
      modalTitle.textContent = cardDetailsTitle.textContent;
      modalSubtitle.textContent = target.dataset.buttonBuy;
    }

    const closeModal = () => {
      modal.classList.remove('open');
      document.removeEventListener('keydown', escapeHandler)
    }

    const escapeHandler = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    }

    modal.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('modal__close') || target === modal) {
        closeModal();
      }
    })

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        closeModal();
      }
    })

    cardDetailsButtonBuy.addEventListener('click', openModal);
    cardDetailsButtonDelivery.addEventListener('click', openModal);
  };

  const renderCrossSell = () => {
    const crossSellList = document.querySelector('.cross-sell__list');

    const createCrossSellItem = (goods) => {
      const liItem = document.createElement('li');

      liItem.innerHTML = `
        <article class="cross-sell__item">
          <img class="cross-sell__image" src="${goods.photo}" alt="${goods.name}">
          <h3 class="cross-sell__title">${goods.name}</h3>
          <p class="cross-sell__price">${goods.price}₽</p>
          <div class="button button_buy cross-sell__button">Купить</div>
        </article>
      `;

      return liItem;
    };
    

    const createCrossSellList = (goods) => {
      const crossSellButtonMax = document.querySelector('.cross-sell__button--max');
      let displayGoods = [];

      for (let i = 0; i < goods.length; i++) {
        displayGoods.push(i);
      }
      
      displayGoods.sort( () => Math.random() - 0.5 );

      displayGoods.forEach( (item, index) => {
        if (index < 4) {
          crossSellList.append(createCrossSellItem(goods[item]));
        }
      })

      crossSellButtonMax.addEventListener('click', () => {
        displayGoods.forEach((item, index) => {
          if (index  >= 4 && crossSellList.childNodes.length <= displayGoods.length - 1) {
            crossSellList.append(createCrossSellItem(goods[item]));
          } else {
            crossSellButtonMax.disabled = true;
            crossSellButtonMax.style.cursor = 'no-drop'
          }
        })
      })
    };

    getData('cross-sell-dbase/dbase.json', createCrossSellList)
  };


  tabs();
  accordion();
  modal();
  renderCrossSell();
}); 