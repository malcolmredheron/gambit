// Get parceljs to glob all of our tests together
// @ts-ignore TypeScript doesn't understand wildcard includes
import allTests = require("../**/*.test.ts");
import {touch} from "../Shared.testing";

// Without this the tests don't actually get loaded.
touch(allTests);
