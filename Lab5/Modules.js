const module = {
  id: "CS4550",
  name: "Web Development",
  description: "Learn full-stack web development with React and Node.js",
  course: "Software Engineering"
};
export default function Module(app) {
  app.get("/lab5/module", (req, res) => {
    res.json(module);
  });

  app.get("/lab5/module/name/:newName", (req, res) => {
    const { newName } = req.params;
    module.name = newName;
    res.json(module.name);
  });


};
