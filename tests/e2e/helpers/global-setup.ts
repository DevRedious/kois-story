import { execSync } from "node:child_process";

function globalSetup() {
	execSync("bundle exec ruby script/e2e_seed.rb", {
		stdio: "inherit",
		cwd: process.cwd(),
	});
}

export default globalSetup;
