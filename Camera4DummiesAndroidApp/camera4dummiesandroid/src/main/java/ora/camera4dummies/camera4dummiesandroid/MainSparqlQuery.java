package ora.camera4dummies.camera4dummiesandroid;

/**
 * Created by joaobiriba on 18/05/14.
 */

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.ListFragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.SimpleAdapter;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;

public class MainSparqlQuery extends ListFragment {
    private Context context;
    //  private static String url = "http://docs.blackberry.com/sampledata.json";

    private static String url_pre = "http://dati.camera.it/sparql?default-graph-uri=&query=";
    private static String url_pos = "&format=application%2Fjson&timeout=0&debug=on&callback=JSON_CALLBACK";

    private static String sqlCollegio;

    private static final String VTYPE = "vehicleType";
    private static final String VCOLOR = "vehicleColor";
    private static final String FUEL = "fuel";
    private static final String TREAD = "treadType";

    ArrayList<HashMap<String, String>> jsonlist = new ArrayList<HashMap<String, String>>();

    ListView lv;


    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.sparqlquerylayout, null);

    }


    public void onActivityCreated(Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        new ProgressTask(getActivity()).execute();

    }
    /*
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.sparqlquerylayout);
        new ProgressTask(MainSparqlQuery.this).execute();
    }*/

    private class ProgressTask extends AsyncTask<String, Void, Boolean> {
        private ProgressDialog dialog;

        private FragmentActivity activity;

        // private List<Message> messages;
        public ProgressTask(FragmentActivity activity) {
            this.activity = activity;
            context = activity;
            dialog = new ProgressDialog(context);
        }


        private Context context;

        protected void onPreExecute() {
            this.dialog.setMessage("Loading data");
            this.dialog.show();
        }

        @Override
        protected void onPostExecute(final Boolean success) {
            if (dialog.isShowing()) {
                dialog.dismiss();
            }
            ListAdapter adapter = new SimpleAdapter(context, jsonlist,
                    R.layout.list_item, new String[]{"collegioValue", "countValue"}, new int[]{
                    R.id.vehicleType, R.id.vehicleColor}
            );

            setListAdapter(adapter);

            // select single ListView item
            lv = getListView();


        }

        protected Boolean doInBackground(final String... args) {

            JSONParser jParser = new JSONParser();
            // get JSON data from URL
            JSONObject json = null;
            try {
                 String sqlCollegio = URLEncoder.encode(
                        "select count(distinct ?deputato) as ?count ?collegio where " +
                                "{ ?deputato a ocd:deputato; ocd:rif_leg <http://dati.camera.it/ocd/legislatura.rdf/repubblica_17>;" +
                                " ocd:rif_mandatoCamera ?mandato . ?mandato ocd:rif_elezione ?elezione . ?elezione dc:coverage ?collegio . FILTER NOT EXISTS" +
                                "{ ?mandato ocd:endDate ?date } } group by ?collegio", "utf-8");

                json = jParser.getJSONFromUrl(url_pre + sqlCollegio + url_pos);
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }

            try {



                JSONObject result = json.getJSONObject("results");

                JSONArray bindings = result.getJSONArray("bindings");

                for (int i = 0; i < bindings.length(); i++) {

                    try {

                        JSONObject collegio = bindings.getJSONObject(i).getJSONObject("collegio");
                        JSONObject count = bindings.getJSONObject(i).getJSONObject("count");



                        String collegioValue = collegio.getString("value");
                        String countValue = count.getString("value");

                        HashMap<String, String> map = new HashMap<String, String>();

                        // Add child node to HashMap key & value
                        map.put("collegioValue", collegioValue);
                        map.put("countValue", countValue);

                        jsonlist.add(map);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }


            return null;
        }
    }

    @Override
    public void onListItemClick(ListView l, View v, int position, long id) {
        super.onListItemClick(l, v, position, id);
        String selectedFromList = ((HashMap<String,String>)lv.getItemAtPosition(position)).get("collegioValue");

        Intent mIntent = new Intent(getActivity(), SecondarySparqlQuery.class);
        mIntent.putExtra("collegio", selectedFromList);
        startActivity(mIntent);

        Log.i("MainSparqlQuery", selectedFromList);
    }
}


