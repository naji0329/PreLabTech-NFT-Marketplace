import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Prelab } from "../target/types/prelab";

describe("prelab", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Prelab as Program<Prelab>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
