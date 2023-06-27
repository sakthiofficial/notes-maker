export const addCreatedHook = (MongooseSchema) => {
  MongooseSchema.pre("save", function preSave(next) {
    if (!this.created) {
      this.created = Math.floor(Date.now() / 1000);
    }
    next();
  });

  MongooseSchema.pre("findOneAndUpdate", function preSave(next) {
    if (!this._update.created) {
      this._update.created = Math.floor(Date.now() / 1000);
    }
    next();
  });
};
