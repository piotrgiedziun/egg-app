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
        image:
          "https://raw.githubusercontent.com/piotrgiedziun/egg-app/master/assets/egg_dark.png",
        text: "Chocolate escuro"
      },
      {
        image:
          "https://raw.githubusercontent.com/piotrgiedziun/egg-app/master/assets/egg_white.png",
        text: "Chocolate branco"
      },
      {
        image:
          "https://raw.githubusercontent.com/piotrgiedziun/egg-app/master/assets/egg_oreo.png",
        text: "Chocolate de Oreo"
      }
    ]
  },
  {
    text: "🍬 Selecione creme",
    items: [
      {
        image:
          "https://raw.githubusercontent.com/piotrgiedziun/egg-app/master/assets/nutella.png",
        text: "Nutella"
      },
      {
        image:
          "https://raw.githubusercontent.com/piotrgiedziun/egg-app/master/assets/leite_condensado.png",
        text: "Leite de condensado"
      },
      {
        image:
          "https://raw.githubusercontent.com/piotrgiedziun/egg-app/master/assets/white_chocolate.png",
        text: "Chocolate branco"
      },
      {
        image:
          "https://raw.githubusercontent.com/piotrgiedziun/egg-app/master/assets/oreo.png",
        text: "Oreo"
      },
      {
        image:
          "https://raw.githubusercontent.com/piotrgiedziun/egg-app/master/assets/white_cream.png",
        text: "Creme branco"
      }
    ]
  },
  {
    text: "🍓 Selecione cobertura",
    items: [
      {
        image:
          "https://raw.githubusercontent.com/piotrgiedziun/egg-app/master/assets/topping_strawberries.png",
        text: "Morangos"
      },
      {
        image:
          "https://raw.githubusercontent.com/piotrgiedziun/egg-app/master/assets/topping_mms.png",
        text: "M&Ms"
      },
      {
        image:
          "https://raw.githubusercontent.com/piotrgiedziun/egg-app/master/assets/topping_oreo.png",
        text: "Oreo"
      },
      {
        image:
          "https://raw.githubusercontent.com/piotrgiedziun/egg-app/master/assets/topping_blueberries.png",
        text: "Amoras"
      },
      {
        image:
          "https://raw.githubusercontent.com/piotrgiedziun/egg-app/master/assets/topping_banana.png",
        text: "Banana"
      },
      {
        image:
          "https://raw.githubusercontent.com/piotrgiedziun/egg-app/master/assets/topping_candies.png",
        text: "Doces"
      },
      {
        image:
          "https://raw.githubusercontent.com/piotrgiedziun/egg-app/master/assets/topping_bears.png",
        text: "Ursos gomosos"
      },
      {
        image:
          "https://raw.githubusercontent.com/piotrgiedziun/egg-app/master/assets/topping_love.png",
        text: "Amor doces"
      },
      {
        image:
          "https://raw.githubusercontent.com/piotrgiedziun/egg-app/master/assets/none.png",
        text: "Nenhum"
      }
    ]
  },
  {
    text: "🍨 Selecione cobertura",
    items: [
      {
        image:
          "https://raw.githubusercontent.com/piotrgiedziun/egg-app/master/assets/final_1.png",
        text: "Chocolate escuro"
      },
      {
        image:
          "https://raw.githubusercontent.com/piotrgiedziun/egg-app/master/assets/final_2.png",
        text: "Granulados 1"
      },
      {
        image:
          "https://raw.githubusercontent.com/piotrgiedziun/egg-app/master/assets/final_3.png",
        text: "Granulados 2"
      },
      {
        image:
          "https://raw.githubusercontent.com/piotrgiedziun/egg-app/master/assets/final_4.png",
        text: "Kit Kat"
      },
      {
        image:
          "https://raw.githubusercontent.com/piotrgiedziun/egg-app/master/assets/none.png",
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
      "Hello! I would like to order: " + selected.map(x => x.text).join(", ")
    );
    const url = `https://api.whatsapp.com/send?phone=+48729161709&text=${text}`;
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
          <div className="imageBig">
            <img
              className="bgImage"
              src="https://raw.githubusercontent.com/piotrgiedziun/egg-app/master/assets/box_bg.png"
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
                  width={300}
                >
                  {data.items.map(item => {
                    return (
                      <div key={item.image}>
                        <img src={item.image} />
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
