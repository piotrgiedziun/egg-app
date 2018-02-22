import React from "react";
import { render } from "react-dom";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./index.css";

const STEPS = [
  {
    text: "🐰 Selecione o ovo",
    items: [
      {
        image: require("./assets/egg_dark.png"),
        text: "Chocolate escuro"
      },
      {
        image: require("./assets/egg_white.png"),
        text: "Chocolate branco"
      },
      {
        image: require("./assets/egg_oreo.png"),
        text: "Chocolate de Oreo"
      }
    ]
  },
  {
    text: "🍫 Selecione creme",
    items: [
      {
        image: require("./assets/nutella.png"),
        text: "Nutella"
      },
      {
        image: require("./assets/leite_condensado.png"),
        text: "Leite de condensado"
      },
      {
        image: require("./assets/white_chocolate.png"),
        text: "Chocolate branco"
      },
      {
        image: require("./assets/oreo.png"),
        text: "Oreo"
      },
      {
        image: require("./assets/white_cream.png"),
        text: "Creme branco"
      }
    ]
  },
  {
    text: "🍓 Selecione cobertura",
    items: [
      {
        image: require("./assets/topping_strawberries.png"),
        text: "Morangos"
      },
      {
        image: require("./assets/topping_mms.png"),
        text: "M&Ms"
      },
      {
        image: require("./assets/topping_oreo.png"),
        text: "Oreo"
      },
      {
        image: require("./assets/topping_blueberries.png"),
        text: "Amoras"
      },
      {
        image: require("./assets/topping_banana.png"),
        text: "Banana"
      },
      {
        image: require("./assets/topping_candies.png"),
        text: "Doces"
      },
      {
        image: require("./assets/topping_bears.png"),
        text: "Ursos gomosos"
      },
      {
        image:
          require("./assets/topping_love.png"),
        text: "Amor doces"
      },
      {
        image:
          require("./assets/none.png"),
        text: "Nenhum"
      }
    ]
  },
  {
    text: "🍩 Selecione cobertura",
    items: [
      {
        image: require("./assets/final_2.png"),
        text: "Granulados 1"
      },
      {
        image:require("./assets/final_3.png"),
        text: "Granulados 2"
      },
      {
        image: require("./assets/final_4.png"),
        text: "Kit Kat"
      },
      {
        image: require("./assets/final_1.png"),
        text: "Chocolate escuro"
      },
      {
        image: require("./assets/none.png"),
        text: "Nenhum"
      }
    ]
  }
];

class App extends React.Component {
  state = {
    step: 0,
    show: true,
    selected: []
  };
  constructor(props) {
    super(props);
    this.onNext = this.onNext.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }
  onBack() {
    const openImage =
      STEPS[this.state.step].items[this.carousel.state.selectedItem].image;
    this.setState(prevState => {
      if (prevState.step <= 0) return;
      const selected = prevState.selected.slice();
      selected.pop();
      return {
        step: prevState.step - 1,
        selected
      };
    });
  }
  onNext() {
    const openItem =
      STEPS[this.state.step].items[this.carousel.state.selectedItem];
    this.setState(prevState => {
      if (prevState.step + 2 > STEPS.length) return;
      return {
        step: prevState.step + 1,
        selected: [...prevState.selected, openItem]
      };
    });
  }
  onFinish() {
    const openItem =
      STEPS[this.state.step].items[this.carousel.state.selectedItem];
    const selected = [...this.state.selected, openItem];

    const text = encodeURIComponent(
      "Oi! Eu gostaria de ter: " + selected.map(x => x.text).join(", ")
    );
    const url = `https://api.whatsapp.com/send?phone=+5514996056596&text=${text}`;
    window.location = url;
  }
  renderNextOrFinalize() {
    const { step } = this.state;
    if (step === STEPS.length - 1) {
      return (
        <button onClick={this.onFinish} className="button">
          Enviar no WhatsApp
        </button>
      );
    }
    return (
      <button className="button" onClick={this.onNext}>
        Continuar
      </button>
    );
  }
  render() {
    const { step, selected } = this.state;
    return (
      <div className="container">
        <h2>{STEPS[step].text}</h2>
        <div className="imagesContainer">
          <div className="image">
            <img
              className="bgImageBig"
              src={require("./assets/box_bg.png")}
            />
          </div>
          {selected.map(item => {
            return (
              <div className="image">
                <img className="bgImage" src={item.image} />
              </div>
            );
          })}
          <div className="image">
            {STEPS.map((data, key) => {
              if (key !== step) return;
              return (
                <Carousel
                  ref={item => (this.carousel = item)}
                  className="carousel"
                  showThumbs={true}
                  infiniteLoop={false}
                  showArrows
                  showStatus={false}
                  emulateTouch
                  width={'75vw'}
                >
                  {data.items.map(item => {
                    return (
                      <div key={item.image}>
                        <img src={item.image} className='bgImage' />
                        <p className="cutomLegend">{item.text}</p>
                      </div>
                    );
                  })}
                </Carousel>
              );
            })}
            <button
              className="button button4"
              onClick={this.onBack}
              disabled={step === 0}
            >
              Costas
            </button>
            <span> </span>
            {this.renderNextOrFinalize()}
          </div>
        </div>
      </div>
    );
  }
}
render(<App />, document.getElementById("root"));
