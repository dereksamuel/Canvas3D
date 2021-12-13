window.onload = () => {
  // CREATE NEURONAL RED
  const neuralNetwork = new brain.NeuralNetwork();

  const data = [
    {
      input: {
        R: 0.78,
        G: 0.9,
        B: 1
      }, // celeste claro
      output: {
        "claro": 1,
      },
    },
    {
      input: {
        R: 0,
        G: 0.11,
        B: 0.2
      }, // celeste oscuro
      output: {
        "oscuro": 1,
      },
    },
  ];

  neuralNetwork.train(data);

  let result = brain.likely({
    R: 0.57,
    G: 0.98,
    B: 0.61,
  }, neuralNetwork);

  console.log(result);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const $testImage = new Image();

  $testImage.src = "./fp.jpg";
  $testImage.crossOrigin = "Anonymous";
  $testImage.width = 15;
  $testImage.height = 15;

  context.drawImage($testImage, 0, 0);
  console.log(context.getImageData(0, 0, $testImage.width, $testImage.height));
};
