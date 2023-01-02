import "./index.css";
import Carousel from 'react-bootstrap/Carousel';

function MainPage() {
  return (
    <div className="flex-column">
      <div className="flex-column px-4 py-5 my-2 text-center">
        <img src="./assets/logo.png" />
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-1">
            The premiere solution for automobile dealership management!
          </p>
        </div>
      </div>
      <div className="container">
        <div className="w-50 mx-auto mb-5">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://di-uploads-pod14.dealerinspire.com/toyotaoforlando/uploads/2021/08/auto-mechanic-1024x684.jpeg"
                alt="First slide"
              />

            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://static.cargurus.com/images/article/2019/09/13/14/35/how_to_talk_to_a_mechanic-pic-8471425371895651297-1600x1200.jpeg"
                alt="Second slide"
              />


            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://elawtalk.com/wp-content/uploads/2018/12/Mechanic-working-on-car-in-garage-dec12.jpg"
                alt="Third slide"
              />


            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div >
  );
}

export default MainPage;
