import {
  AlertCircle,
  Flame,
  Plus,
  RotateCcw,
  Sparkles,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import "./teoriaErrores.css";

const FORMULAS = {
  suma: "Y = A + B",
  resta: "Y = A - B",
  producto: "Y = A × B",
  division: "Y = A / B",
  potencia: "Y = A^p",
};

function numero(valor) {
  return Number(valor).toLocaleString("es-MX", { maximumFractionDigits: 8 });
}

function Campo({ label, name, value, onChange, type = "text", step, required = true, placeholder }) {
  return (
    <label className="te-field">
      <span>{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        step={step}
        required={required}
        placeholder={placeholder}
      />
    </label>
  );
}

function CampoUnidad({ label, name, value, onChange }) {
  return (
    <Campo
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      placeholder="p. ej. m, s, kg"
    />
  );
}

function ResultadoDirecto({ resultado }) {
  return (
    <section className="te-result" aria-live="polite">
      <div className="te-result-heading">
        <div>
          <span className="te-eyebrow">Informe de medición</span>
          <h2>{resultado.magnitud}</h2>
        </div>
        <span className="te-result-badge">MEDICIÓN DIRECTA</span>
      </div>
      <div className="te-metrics">
        <article className="te-metric te-metric-featured">
          <span>Resultado final</span>
          <strong>
            ({numero(resultado.media)} ± {numero(resultado.incertidumbreCombinada)})
          </strong>
          <small>{resultado.unidad}</small>
        </article>
        <article className="te-metric">
          <span>Valor medio</span>
          <strong>{numero(resultado.media)}</strong>
          <small>{resultado.unidad}</small>
        </article>
        <article className="te-metric">
          <span>Incertidumbre combinada</span>
          <strong>{numero(resultado.incertidumbreCombinada)}</strong>
          <small>{resultado.unidad}</small>
        </article>
        <article className="te-metric">
          <span>Desviación estándar muestral</span>
          <strong>{numero(resultado.desviacionEstandar)}</strong>
          <small>{resultado.unidad}</small>
        </article>
      </div>
      <div className="te-report-grid">
        <div>
          <span>Mediciones ({resultado.cantidad})</span>
          <p>{resultado.mediciones.map(numero).join(" · ")}</p>
        </div>
        <div>
          <span>Error estándar de la media</span>
          <p>{numero(resultado.errorEstandar)} {resultado.unidad}</p>
        </div>
        <div>
          <span>Error instrumental</span>
          <p>{numero(resultado.incertidumbreInstrumental)} {resultado.unidad}</p>
        </div>
        <div>
          <span>Intervalo del resultado</span>
          <p>[{numero(resultado.limiteInferior)}, {numero(resultado.limiteSuperior)}] {resultado.unidad}</p>
        </div>
        <div>
          <span>Coeficiente de variación</span>
          <p>
            {resultado.coeficienteVariacion === null
              ? "No definido cuando el valor medio es cero"
              : `${numero(resultado.coeficienteVariacion)} %`}
          </p>
        </div>
      </div>
    </section>
  );
}

function ResultadoIndirecto({ resultado }) {
  return (
    <section className="te-result" aria-live="polite">
      <div className="te-result-heading">
        <div>
          <span className="te-eyebrow">Informe de propagación</span>
          <h2>{resultado.nombreY}</h2>
        </div>
        <span className="te-result-badge">MEDICIÓN INDIRECTA</span>
      </div>
      <div className="te-metrics">
        <article className="te-metric te-metric-featured">
          <span>Resultado final</span>
          <strong>
            ({numero(resultado.resultado)} ± {numero(resultado.incertidumbreCombinada)})
          </strong>
          <small>{resultado.unidadY}</small>
        </article>
        <article className="te-metric">
          <span>Función aplicada</span>
          <strong className="te-formula-result">{resultado.formula}</strong>
          <small>Propagación de incertidumbre</small>
        </article>
        <article className="te-metric">
          <span>Incertidumbre absoluta</span>
          <strong>{numero(resultado.incertidumbreCombinada)}</strong>
          <small>{resultado.unidadY}</small>
        </article>
        <article className="te-metric">
          <span>Intervalo de Y</span>
          <strong className="te-formula-result">
            [{numero(resultado.limiteInferior)}, {numero(resultado.limiteSuperior)}]
          </strong>
          <small>{resultado.unidadY}</small>
        </article>
      </div>
      <div className="te-report-grid">
        <div>
          <span>Derivada parcial dY/dA</span>
          <p>{numero(resultado.derivadaA)}</p>
        </div>
        {resultado.derivadaB !== null && (
          <div>
            <span>Derivada parcial dY/dB</span>
            <p>{numero(resultado.derivadaB)}</p>
          </div>
        )}
        <div>
          <span>Contribución de A</span>
          <p>{numero(resultado.contribucionA)}</p>
        </div>
        {resultado.contribucionB !== null && (
          <div>
            <span>Contribución de B</span>
            <p>{numero(resultado.contribucionB)}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export function VistaTeoriaErrores({
  pestanaActiva,
  directas,
  indirectas,
  resultado,
  error,
  onCambiarPestana,
  onActualizarDirectas,
  onActualizarMedicion,
  onAgregarMedicion,
  onQuitarMedicion,
  onActualizarIndirectas,
  onCalcular,
  onLimpiar,
}) {
  const esDirecta = pestanaActiva === "directas";

  return (
    <div className="teoria-errores">
      <div className="te-shell">
        <header className="te-hero">
          <div className="te-hero-orb" aria-hidden="true" />
          <div className="te-hero-icon"><Flame size={25} /></div>
          <div className="te-hero-copy">
            <span className="te-eyebrow"><Sparkles size={13} /> Laboratorio de incertidumbre</span>
            <h1>Teoría de errores</h1>
            <p>Cuantifica el margen de incertidumbre detrás de cada medición.</p>
          </div>
          <div className="te-hero-stamp"><span>GAUSS</span><strong>σ</strong></div>
        </header>

        <div className="te-workspace">
          <div className="te-tabs" role="tablist" aria-label="Tipo de medición">
            <button
              type="button"
              role="tab"
              aria-selected={esDirecta}
              className={esDirecta ? "te-tab te-tab-active" : "te-tab"}
              onClick={() => onCambiarPestana("directas")}
            >
              <span className="te-tab-number">01</span>
              <span><strong>Mediciones directas</strong><small>Repetición + error instrumental</small></span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={!esDirecta}
              className={!esDirecta ? "te-tab te-tab-active" : "te-tab"}
              onClick={() => onCambiarPestana("indirectas")}
            >
              <span className="te-tab-number">02</span>
              <span><strong>Mediciones indirectas</strong><small>Propagación por derivadas</small></span>
            </button>
          </div>

          <section className="te-panel">
            <div className="te-panel-heading">
              <div>
                <span className="te-eyebrow">ENTRADAS DEL EXPERIMENTO</span>
                <h2>{esDirecta ? "Mediciones directas" : "Propagación de incertidumbre"}</h2>
              </div>
              <span className="te-live"><span /> LISTO PARA CALCULAR</span>
            </div>

            <form onSubmit={onCalcular}>
              {esDirecta ? (
                <div className="te-form-grid">
                  <Campo label="Magnitud física" name="magnitud" value={directas.magnitud} onChange={onActualizarDirectas} placeholder="p. ej. Longitud" />
                  <CampoUnidad label="Unidad de medida" name="unidad" value={directas.unidad} onChange={onActualizarDirectas} />
                  <div className="te-measurements">
                    <div className="te-measurements-heading">
                      <span>Lecturas experimentales <small>({directas.mediciones.length})</small></span>
                      <button type="button" className="te-add-button" onClick={onAgregarMedicion}>
                        <Plus size={15} /> Añadir lectura
                      </button>
                    </div>
                    <div className="te-reading-list">
                      {directas.mediciones.map((medicion, indice) => (
                        <div className="te-reading" key={indice}>
                          <span>{String(indice + 1).padStart(2, "0")}</span>
                          <input
                            type="number"
                            step="any"
                            required
                            aria-label={`Medición ${indice + 1}`}
                            value={medicion}
                            onChange={(evento) => onActualizarMedicion(indice, evento.target.value)}
                            placeholder={`Medición ${indice + 1}`}
                          />
                          {directas.mediciones.length > 2 && (
                            <button type="button" aria-label={`Eliminar medición ${indice + 1}`} onClick={() => onQuitarMedicion(indice)}>
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="te-hint">Se requieren al menos dos lecturas para calcular la desviación muestral.</p>
                  </div>
                  <Campo
                    label="Incertidumbre instrumental"
                    name="incertidumbreInstrumental"
                    value={directas.incertidumbreInstrumental}
                    onChange={onActualizarDirectas}
                    type="number"
                    step="any"
                    placeholder="0.01"
                  />
                </div>
              ) : (
                <div className="te-form-grid">
                  <label className="te-field">
                    <span>Función matemática</span>
                    <select name="opcion" value={indirectas.opcion} onChange={onActualizarIndirectas}>
                      <option value="suma">Y = A + B · Suma</option>
                      <option value="resta">Y = A − B · Resta</option>
                      <option value="producto">Y = A × B · Producto</option>
                      <option value="division">Y = A / B · División</option>
                      <option value="potencia">Y = A^p · Potencia</option>
                    </select>
                  </label>
                  <div className="te-formula-chip">
                    <span>MODELO</span>
                    <strong>{FORMULAS[indirectas.opcion]}</strong>
                  </div>
                  <div className="te-subsection-title"><span>A</span><strong>Primera magnitud</strong></div>
                  <Campo label="Valor de A" name="valorA" value={indirectas.valorA} onChange={onActualizarIndirectas} type="number" step="any" placeholder="0" />
                  <Campo label="Incertidumbre de A" name="incertidumbreA" value={indirectas.incertidumbreA} onChange={onActualizarIndirectas} type="number" step="any" placeholder="0.01" />
                  <CampoUnidad label="Unidad de A" name="unidadA" value={indirectas.unidadA} onChange={onActualizarIndirectas} />
                  {indirectas.opcion === "potencia" ? (
                    <Campo label="Exponente p" name="exponente" value={indirectas.exponente} onChange={onActualizarIndirectas} type="number" step="any" placeholder="2" />
                  ) : (
                    <>
                      <div className="te-subsection-title"><span>B</span><strong>Segunda magnitud</strong></div>
                      <Campo label="Valor de B" name="valorB" value={indirectas.valorB} onChange={onActualizarIndirectas} type="number" step="any" placeholder="0" />
                      <Campo label="Incertidumbre de B" name="incertidumbreB" value={indirectas.incertidumbreB} onChange={onActualizarIndirectas} type="number" step="any" placeholder="0.01" />
                      <CampoUnidad label="Unidad de B" name="unidadB" value={indirectas.unidadB} onChange={onActualizarIndirectas} />
                    </>
                  )}
                  <div className="te-subsection-title"><span>Y</span><strong>Resultado final</strong></div>
                  <Campo label="Nombre de la magnitud" name="nombreY" value={indirectas.nombreY} onChange={onActualizarIndirectas} placeholder="p. ej. Área" />
                  <CampoUnidad label="Unidad de Y" name="unidadY" value={indirectas.unidadY} onChange={onActualizarIndirectas} />
                </div>
              )}

              {error && (
                <div className="te-error" role="alert">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <div className="te-actions">
                <button type="submit" className="te-calculate-button">
                  <Flame size={17} /> Calcular incertidumbre
                </button>
                <button type="button" className="te-reset-button" onClick={onLimpiar}>
                  <RotateCcw size={16} /> Limpiar
                </button>
              </div>
            </form>
          </section>

          {resultado ? (
            resultado.tipo === "directas"
              ? <ResultadoDirecto resultado={resultado} />
              : <ResultadoIndirecto resultado={resultado} />
          ) : (
            <div className="te-empty">
              <TriangleAlert size={18} />
              <p>El resultado aparecerá aquí después de calcular.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
