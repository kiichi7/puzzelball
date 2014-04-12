//BlobShadowController.cs

using UnityEngine;
using System.Collections;

public class BlobShadowController : MonoBehaviour
{
    void Update()
    {																
      	transform.position = transform.parent.position + Vector3.up * transform.parent.localScale.y * 5f;//* .50f;
//		transform.position = transform.parent.position + Vector3.up * 15f;
//		Debug.Log(transform.position);
        transform.rotation = Quaternion.LookRotation(-Vector3.up, transform.parent.forward);
    }
}