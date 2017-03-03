export class ErrorHandlerTest {
  // function error() {
  // var foo = {};
  // return foo.bar();
  constructor(){
  }

  bomb() {
    var foo = {};
    return foo.bar();
  }
  attached(){
    $("#button_normal").ejButton({
      //normal size type is used
      size: "normal",
      showRoundedCorner: true,
      contentType: "imageonly",
      prefixIcon: "e-icon e-handup"
    });
  }
}
