import Layout from "components/Layout";
import { MAX_CACHE_TIME } from "common/config";

export async function getStaticProps() {
  return { props: {}, revalidate: MAX_CACHE_TIME };
}

const API_FUNCTIONS = [
  {
    name: "Competitions list",
    usage: "competitions?q=QUERY",
    example: "competitions?q=argentina",
  },
  {
    name: "Competition details",
    usage: "competitions/ID",
    example: "competitions/m3e",
  },

  {
    name: "Team details",
    usage: "teams/ID",
    example: "teams/8vjk",
  },
  {
    name: "Match details",
    usage: "matches/ID",
    example: "matches/kx811k",
  },
  {
    name: "Live matches list",
    usage: "live",
    example: "live",
  },
];

export default function DeveloperPage() {
  return (
    <Layout title={"Developer API"}>
      <div className="developer__container container">
        {API_FUNCTIONS.map(({ name, usage, example }) => (
          <div key={name}>
            <h2>{name}</h2>
            <div className="block">
              <p>
                Usage: <code>{usage}</code>
              </p>
              <p>
                Example:{" "}
                <a href={`/api/${example}`} target="_blank" rel="noreferrer">
                  /api/{example}
                </a>
              </p>
            </div>
          </div>
        ))}

        <h2>License</h2>
        <div className="block">
          <p>
            THE SERVICE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY
            KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY
            CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
            TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
            SERVICE OR THE USE OR OTHER DEALINGS IN THE SERVICE.
          </p>
        </div>
      </div>
    </Layout>
  );
}
