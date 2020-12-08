/* eslint-disable import/extensions */
import React from 'react';
import Axios from 'axios';
import FinanceModal from './FinanceModal.jsx';
import CreatorsModal from './CreatorsModal.jsx';
import HolidayModal from './HolidayModal.jsx';
import SizeGuideModal from './SizeGuideModal.jsx';
import SizeOutOfStockModal from './SizeOutOfStockModal.jsx';
import AddToBagModal from './AddToBagModal.jsx';

class AddToBag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        sizes: [],
      },
      selectedSize: '',
    };
    this.getNewItem = this.getNewItem.bind(this);
    this.selectSize = this.selectSize.bind(this);
  }

  componentDidMount() {
    let itemId = 1;
    if (window.location.pathname !== '/') {
      const thePath = window.location.pathname.split('/');
      itemId = [thePath[1]];
    }
    this.getNewItem(itemId);
  }

  getNewItem(itemId) {
    Axios.get(`/api/checkout/${itemId}`)
      .then(({ data }) => {
        const { rows } = data;
        this.setState({
          item: {
            ...rows[0],
            sizes: rows[0].sizes.split(' '),
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  selectSize(e) {
    e.preventDefault();
    this.setState({
      selectedSize: e.target.innerHTML,
    });
  }

  render() {
    const { item } = this.state;
    const { sizes } = item;
    const { selectedSize } = this.state;
    return (
      <section className="container">
        <div className="description">
          <div className="item-category">
            {item.category}
          </div>
          <h1 className="item-name">
            {item.name}
          </h1>
          <h3 className="item-color">
            {item.color}
          </h3>
          <h4 className="item-price">
            {`$${item.price}`}
          </h4>
          <div>
            {sizes.map((size) => {
              if (selectedSize === size) {
                return (
                  <button
                    type="button"
                    className="size-button selected"
                    key={size}
                    onClick={this.selectSize}
                  >
                    {size}
                  </button>
                );
              }
              return (
                <button
                  type="button"
                  className="size-button"
                  key={size}
                  onClick={this.selectSize}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mini-container">
          <SizeGuideModal />
          <SizeOutOfStockModal sizes={sizes} />
        </div>
        <div className="mini-container">
          <AddToBagModal item={item} size={selectedSize} />
          <button
            type="button"
            className="heart"
          >
            &#x2661;
          </button>
        </div>
        <div className="promotions">
          <div className="finance">
            <FinanceModal />
          </div>
          <div className="creators">
            <CreatorsModal />
          </div>
          <div className="holiday">
            <HolidayModal />
          </div>
        </div>
      </section>
    );
  }
}

export default AddToBag;
