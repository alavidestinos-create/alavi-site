import { describe, expect, it } from "vitest";
import { candidateDomains, clearCookiesForCategories } from "@/lib/cookie-cleanup";

/** Jar simples que imita document.cookie: guarda nomes e respeita expiração. */
function makeJar(initial: Record<string, string>) {
  const store = new Map(Object.entries(initial));
  return {
    get cookie() {
      return [...store.entries()].map(([k, v]) => `${k}=${v}`).join("; ");
    },
    set cookie(value: string) {
      const [pair] = value.split(";");
      const [name] = (pair as string).split("=");
      if (/expires=Thu, 01 Jan 1970/.test(value)) store.delete((name as string).trim());
    },
    names: () => [...store.keys()],
  };
}

const ALL = {
  _ga: "1",
  _ga_ABC123: "1",
  _gid: "1",
  _clck: "1",
  _clsk: "1",
  _fbp: "1",
  _fbc: "1",
  _gcl_au: "1",
  alavi_other: "1",
};

describe("clearCookiesForCategories", () => {
  it("retirar só Análise apaga _ga/_gid/Clarity e mantém Publicidade e outros", () => {
    const jar = makeJar(ALL);
    clearCookiesForCategories({ analytics: true, marketing: false }, jar, "www.alavidestinos.com.br");
    expect(jar.names().sort()).toEqual(["_fbc", "_fbp", "_gcl_au", "alavi_other"]);
  });

  it("retirar só Publicidade apaga _fbp/_fbc/_gcl e mantém Análise e outros", () => {
    const jar = makeJar(ALL);
    clearCookiesForCategories({ analytics: false, marketing: true }, jar, "www.alavidestinos.com.br");
    expect(jar.names().sort()).toEqual(["_clck", "_clsk", "_ga", "_ga_ABC123", "_gid", "alavi_other"]);
  });

  it("retirar as duas apaga tudo de medição, mas preserva cookies não relacionados", () => {
    const jar = makeJar(ALL);
    clearCookiesForCategories({ analytics: true, marketing: true }, jar, "localhost");
    expect(jar.names()).toEqual(["alavi_other"]);
  });

  it("sem categorias retiradas não apaga nada", () => {
    const jar = makeJar(ALL);
    const cleared = clearCookiesForCategories({ analytics: false, marketing: false }, jar, "localhost");
    expect(cleared).toEqual([]);
    expect(jar.names()).toHaveLength(Object.keys(ALL).length);
  });
});

describe("candidateDomains", () => {
  it("inclui host e domínios pai, sem o TLD sozinho", () => {
    expect(candidateDomains("www.alavidestinos.com.br")).toEqual([
      undefined,
      "www.alavidestinos.com.br",
      ".alavidestinos.com.br",
      ".com.br",
    ]);
  });

  it("localhost só tem o host", () => {
    expect(candidateDomains("localhost")).toEqual([undefined, "localhost"]);
  });
});
