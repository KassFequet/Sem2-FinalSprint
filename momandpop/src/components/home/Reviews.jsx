import Review1 from "../../images/Home/review1.png";
import Review2 from "../../images/Home/review2.png";
import Review3 from "../../images/Home/review3.png";
import Review4 from "../../images/Home/review4.png";
import Review5 from "../../images/Home/review5.png";
import reviewBackdrop from "../../images/Home/reviewbackdrop.jpg";

const Reviews = () => {
  return (
    <>
      <div
        className="scrollBar"
        style={{ backgroundImage: `url(${reviewBackdrop})` }}
      >
        <div className="itemBox">
          <img src={Review1} alt="saw mill in the winter" />
          <div className="itemText">
            <p className="itemDesc">
              "Thanks to their top-notch timber, I built my own sawmill.
              Might've worked out of needing wood, but I'll always return for
              tools and banter!"
            </p>
            <span>- Derrick W.</span>
          </div>
        </div>

        <div className="itemBox">
          <img src={Review2} alt="grandfather and grandson gardening" />
          <div className="itemText">
            <p className="itemDesc">
              “Sharing gardening with my grandson is easier with the reliable
              tools and seeds from Mom’s Garden & Pop’s Workshop, a place like
              family.”
            </p>
            <span>- Walter S.</span>
          </div>
        </div>

        <div className="itemBox">
          <img src={Review3} alt="wooden plant display" />
          <div className="itemText">
            <p className="itemDesc">
              “Used their timber and garden supplies to create a beautiful plant
              display. Everything came together perfectly thanks to their
              helpful team.”
            </p>
            <span>- Claire H.</span>
          </div>
        </div>

        <div className="itemBox">
          <img src={Review4} alt="growing tomatos on a vine" />
          <div className="itemText">
            <p className="itemDesc">
              “My tomato plants have never looked better this season. The seeds
              and help from Mom & Pop make all the difference every single
              year.”
            </p>
            <span>- Olivia L.</span>
          </div>
        </div>

        <div className="itemBox">
          <img src={Review5} alt="man in a wooden sauna" />
          <div className="itemText">
            <p className="itemDesc">
              “Solid tools, great lumber, and even better advice. My dream sauna
              came together far better than I ever imagined thanks to Mom &
              Pop.”
            </p>
            <span>- Eric T.</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
