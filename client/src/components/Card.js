import React, { Component } from 'react'

export default class Card extends Component {
    render() {
            return (
              <>
                <div className="products-container">
                  <div className="products-card-wrapper">
                    {this.props.data.map((product) => {
                      return (
                        <div className="card-container">
                          <img
                            className="card-image"
                            alt=""
                            src={product.gallery[0]}
                          ></img>
                          <div className="card-text-box">
                            <h3>{product.name}</h3>
                            <h3>set currency in Redux first</h3>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </>
            )
          
    }
}
