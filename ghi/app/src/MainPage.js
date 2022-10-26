import "./index.css";
import Carousel from 'react-bootstrap/Carousel';

function MainPage() {
	return (
		<>
			<div className="px-4 py-5 my-5 text-center">
				<h1 className="display-5 fw-bold">CarCar</h1>
				<div className="col-lg-6 mx-auto">
					<p className="lead mb-4">
						The premiere solution for automobile dealership management!
					</p>
				</div>
			</div>

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
		</>
	);
}

export default MainPage;
