import Elysia, { t } from "elysia";
import e from "../../dbschema/edgeql-js";
import db from "../../dbschema";
import { Being } from "../../dbschema/interfaces";

const actions = {
  index: async () => {
    const beings = e.select(e.Being, () => ({
      ...e.Being["*"],
    }));

    return await beings.run(db);
  },
  store: async (req: Omit<Being, "id">) => {
    const q = e.insert(e.Being, {
      ...req,
    });

    return await q.run(db);
  },
  show: async (id: string) => {
    const being = e.select(e.Being, () => ({
      ...e.Being["*"],

      filter_single: { id },
    }));

    return await being.run(db);
  },
  update: async (id: string, req: Partial<Omit<Being, "id">>) => {
    const q = e.update(e.Being, () => ({
      filter_single: { id },

      set: req,
    }));

    return await q.run(db);
  },
  destroy: async (id: string) => {
    const q = e.delete(e.Being, () => ({
      filter_single: { id },
    }));

    return await q.run(db);
  },
};

const being_model = t.Object({
  id: t.String(),
  name: t.String(),
  strength: t.Number(),
  dexterity: t.Number(),
  intelligence: t.Number(),
});

const being_models = new Elysia().model({
  being: being_model,
  beings: t.Array(being_model),
  "being.nullable": t.Nullable(being_model),
  "being.optional": t.Partial(being_model),
});

const being = new Elysia().group("/beings", (app) =>
  app
    .use(being_models)
    .get("/", () => actions.index(), {
      response: "beings",
    })
    .post("/", ({ body }) => actions.store(body), {
      body: "being",
    })
    .get("/:id", ({ params: { id } }) => actions.show(id), {
      response: "being.nullable",
    })
    .patch("/:id", ({ params: { id }, body }) => actions.update(id, body), {
      body: "being.optional",
    })
    .delete("/:id", ({ params: { id } }) => actions.destroy(id))
);

export default being;
